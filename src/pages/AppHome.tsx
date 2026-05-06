import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, HeartHandshake, Sparkles } from "lucide-react";
import { toast } from "sonner";

import SacredPathBrand from "@/components/SacredPathBrand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchCoupleStateForUser,
  markEverConnected,
  storeConnectedCoupleId,
  clearForceDisconnected,
} from "@/lib/couples";
import { type WeatherState } from "@/data/ritualLibrary";

const WEATHER: Array<{ key: WeatherState; label: string; subtitle: string; tones: string }> = [
  { key: "sunny", label: "Sunny", subtitle: "Clear and connected", tones: "from-amber-300 to-yellow-500" },
  { key: "warm", label: "Warm", subtitle: "Tender and close", tones: "from-rose-300 to-orange-400" },
  { key: "electric", label: "Electric", subtitle: "Spark and chemistry", tones: "from-violet-400 to-blue-500" },
  { key: "foggy", label: "Foggy", subtitle: "Unclear and distant", tones: "from-slate-300 to-violet-300" },
  { key: "frozen", label: "Frozen", subtitle: "Numb and shut down", tones: "from-cyan-300 to-blue-400" },
  { key: "stormy", label: "Stormy", subtitle: "Charged and tense", tones: "from-slate-500 to-slate-700" },
];

function WeatherPicker({
  title,
  value,
  onChange,
}: {
  title: string;
  value: WeatherState;
  onChange: (value: WeatherState) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {WEATHER.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`rounded-2xl border p-3 text-left transition ${
              value === item.key
                ? "border-primary bg-primary/20 shadow-md shadow-primary/20"
                : "border-border bg-card/70 hover:bg-card"
            }`}
          >
            <div className={`h-1.5 rounded-full bg-gradient-to-r ${item.tones} mb-2`} />
            <p className="font-semibold">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

const generateCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

function PartnerConnectCard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const loadState = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    const resolved = await fetchCoupleStateForUser(supabase, user.id);
    if (resolved.connected && resolved.activeCouple?.id) {
      markEverConnected(user.id);
      storeConnectedCoupleId(user.id, resolved.activeCouple.id);
    }
    setIsConnected(resolved.connected);
    setInviteCode(
      resolved.connected
        ? resolved.activeCouple?.couple_code ?? null
        : resolved.pendingInvite?.couple_code ?? null,
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void loadState();
  }, [loadState]);

  useEffect(() => {
    if (!user) return;
    const refresh = () => void loadState();
    const a = supabase
      .channel(`home_couples_a_${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "couples", filter: `partner_a=eq.${user.id}` }, refresh)
      .subscribe();
    const b = supabase
      .channel(`home_couples_b_${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "couples", filter: `partner_b=eq.${user.id}` }, refresh)
      .subscribe();
    return () => {
      supabase.removeChannel(a);
      supabase.removeChannel(b);
    };
  }, [user, loadState]);

  const createInvite = async () => {
    if (!user) return;
    setBusy(true);
    const existing = await fetchCoupleStateForUser(supabase, user.id);
    if (existing.pendingInvite?.couple_code) {
      setInviteCode(existing.pendingInvite.couple_code);
      setBusy(false);
      return;
    }
    for (let i = 0; i < 3; i++) {
      const newCode = generateCode();
      const { error } = await supabase.from("couples").insert({ partner_a: user.id, couple_code: newCode });
      if (!error) {
        await loadState();
        setBusy(false);
        return;
      }
      if (!error.message?.includes("unique")) break;
    }
    toast.error("Could not create invite right now.");
    setBusy(false);
  };

  const joinWithCode = async () => {
    if (!user || !code.trim()) return;
    setBusy(true);
    const cleanCode = code.trim().toUpperCase();
    const { data: target } = await supabase
      .from("couples")
      .select("id, partner_a, partner_b")
      .eq("couple_code", cleanCode)
      .is("partner_b", null)
      .maybeSingle();
    if (!target) {
      toast.error("Invite code not found.");
      setBusy(false);
      return;
    }
    if (target.partner_a === user.id) {
      toast.error("This is already your own code.");
      setBusy(false);
      return;
    }
    const { data: updated } = await supabase
      .from("couples")
      .update({ partner_b: user.id })
      .eq("id", target.id)
      .is("partner_b", null)
      .select("id, partner_b");
    if (!updated || !updated.find((r) => r.partner_b === user.id)) {
      toast.error("Could not join this couple right now.");
      setBusy(false);
      return;
    }
    clearForceDisconnected(user.id);
    toast.success("You are now connected.");
    setCode("");
    await loadState();
    setBusy(false);
  };

  const fallbackCopy = (text: string) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const copyInvite = async () => {
    if (!inviteCode) {
      toast.error("No code yet. Tap 'Create invite code' first.");
      return;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(inviteCode);
        toast.success(`Code ${inviteCode} copied.`);
        return;
      }
      throw new Error("no clipboard");
    } catch {
      if (fallbackCopy(inviteCode)) {
        toast.success(`Code ${inviteCode} copied.`);
      } else {
        toast.error("Copy failed. Long-press the code to copy it.");
      }
    }
  };

  const shareInvite = async () => {
    if (!inviteCode) {
      toast.error("No code yet. Tap 'Create invite code' first.");
      return;
    }
    const message = `Join me on Sacred Path for Couples. Use my invite code: ${inviteCode}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Sacred Path invite", text: message });
        return;
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
    }
    await copyInvite();
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-border bg-card/70 p-5 md:p-6 h-32 animate-pulse" />
    );
  }

  if (isConnected) {
    return (
      <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-card/90 to-card/90 p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-emerald-400/30 bg-background/40 p-3 text-emerald-300">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">Connected</p>
            <h2 className="font-display text-2xl text-foreground">Your temple is shared</h2>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          You and your partner are linked. Rituals, weather, and gratitude flow between you.
        </p>
        {inviteCode && (
          <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Your couple code</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <code className="flex-1 min-w-[140px] font-mono text-2xl tracking-[0.3em] text-foreground select-all">
                {inviteCode}
              </code>
              <Button size="sm" variant="outline" onClick={copyInvite}>
                <Copy className="h-4 w-4 mr-1" /> Copy
              </Button>
              <Button size="sm" onClick={shareInvite}>
                <Sparkles className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/90 to-card/90 p-5 md:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-primary/30 bg-background/40 p-3 text-primary">
          <HeartHandshake className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Connect with partner</p>
          <h2 className="font-display text-2xl text-foreground">One code links your temple</h2>
        </div>
      </div>

      {inviteCode ? (
        <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Your invite code</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <code className="flex-1 min-w-[140px] font-mono text-2xl tracking-[0.3em] text-foreground select-all">
              {inviteCode}
            </code>
            <Button size="sm" variant="outline" onClick={copyInvite}>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
            <Button size="sm" onClick={shareInvite}>
              <Sparkles className="h-4 w-4 mr-1" /> Share
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Share this code with your partner. Once they enter it, your temple becomes shared.
          </p>
        </div>
      ) : (
        <Button onClick={createInvite} disabled={busy} className="w-full md:w-auto">
          <Sparkles className="h-4 w-4 mr-2" /> Create invite code
        </Button>
      )}

      <div className="rounded-2xl border border-border/60 bg-background/50 p-4 space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Have a code from your partner?</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ENTER CODE"
            className="font-mono tracking-[0.2em] uppercase"
            maxLength={12}
          />
          <Button onClick={joinWithCode} disabled={busy || !code.trim()} variant="secondary">
            Join partner
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        You can also continue solo — your weather, rituals, and journal still work without a partner.
      </p>
    </div>
  );
}

export default function AppHome() {
  const [myWeather, setMyWeather] = useState<WeatherState>("warm");
  const [partnerWeather, setPartnerWeather] = useState<WeatherState>("sunny");

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="container max-w-5xl space-y-6 md:space-y-8">
        {/* Brand — Mathieu + Edita */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SacredPathBrand className="w-full max-w-[360px]" />
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            How are you two feeling today?
          </h1>
        </div>

        {/* Partner connect (or solo) */}
        <PartnerConnectCard />

        {/* Weather selection */}
        <div className="space-y-6 rounded-3xl border border-border bg-card/70 p-5 md:p-6">
          <WeatherPicker title="My weather" value={myWeather} onChange={setMyWeather} />
          <WeatherPicker title="Partner weather" value={partnerWeather} onChange={setPartnerWeather} />

          <Link to={`/app/tonight-paths?me=${myWeather}&partner=${partnerWeather}`} className="block">
            <Button className="w-full md:w-auto">Open Tonight Path</Button>
          </Link>
        </div>

        {/* Gratitude card */}
        <Link
          to="/app/tools"
          className="block rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-card/90 to-card/90 p-5 md:p-6 transition hover:border-cyan-300/50"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Calm reset</p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl text-foreground">
            Timer & Breathing
          </h2>
          <p className="mt-2 text-muted-foreground">
            Use a focused timer or guided breathing patterns: Box and 4-7-8 at 3, 5, or 10 minutes.
          </p>
        </Link>

        {/* Gratitude card */}
        <Link
          to="/app/space?tab=messages&kind=gratitude"
          className="block rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/90 to-card/90 p-5 md:p-6 transition hover:border-primary/50"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Gratitude whisper</p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl text-foreground">
            Send one small thank-you
          </h2>
          <p className="mt-2 text-muted-foreground">
            One sentence of gratitude keeps love warm between the great moments.
          </p>
        </Link>
      </div>
    </div>
  );
}
