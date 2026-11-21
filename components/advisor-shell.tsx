"use client";

import { useState } from "react";
import { Caption } from "./caption";
import { Chips, InputRow, StatusBar, StepBar, useInputFocus } from "./controls";
import { OfferCard } from "./offer-card";
import { ScriptPanel } from "./script-panel";
import { Stage } from "./stage";
import { useAdvisor } from "./use-advisor";
import { useSpeechInput } from "./use-speech-input";

export function AdvisorShell() {
  const advisor = useAdvisor();
  const input = useInputFocus();
  const [scriptOpen, setScriptOpen] = useState(false);

  const mic = useSpeechInput((text, final) => {
    if (final) {
      input.setText("");
      if (text) advisor.say(text);
    } else {
      input.setText(text);
    }
  });

  const { snapshot, mainStep, availability } = advisor;
  const pausedAt = snapshot ? `${snapshot.mainIndex + 1}/${mainStep?.count ?? 8}` : null;
  const micText = mic.supported ? "mic: hold the button to talk" : "mic: not supported in this browser, type instead";
  const liveText = availability.live ? "live answers: on" : availability.backup ? "live answers: off (backup mode)" : "live answers: off (offline)";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-4 px-4 py-4">
      <StatusBar
        mode={advisor.mode}
        backup={availability.backup}
        sound={advisor.sound}
        scriptOpen={scriptOpen}
        onSound={() => advisor.setSound(!advisor.sound)}
        onScript={() => setScriptOpen((open) => !open)}
      />
      <StepBar main={advisor.mainStep} side={advisor.sideStep} mode={advisor.mode} />
      <Stage world={advisor.world} figure={advisor.figure} pausedAt={pausedAt} />
      <Caption line={advisor.line} />
      {advisor.offer && <OfferCard confirmed={advisor.offerConfirmed} onConfirm={advisor.confirmOffer} />}
      <Chips
        mode={advisor.mode}
        onStart={advisor.start}
        onSay={advisor.say}
        onResume={advisor.resume}
        onMore={() => {
          advisor.interrupt();
          input.focus();
        }}
      />
      <InputRow
        mode={advisor.mode}
        micSupported={mic.supported}
        micActive={mic.listening}
        text={input.text}
        onText={input.setText}
        onSubmit={advisor.say}
        onStop={advisor.interrupt}
        onMicDown={() => {
          advisor.interrupt();
          mic.start();
        }}
        onMicUp={mic.stop}
        inputRef={input.ref}
      />
      <p className="text-xs leading-5 text-faint">
        {liveText} · {advisor.availability.voiceLine} · {micText}
      </p>
      {advisor.error && <p className="text-xs text-coral">{advisor.error}</p>}
      {scriptOpen && <ScriptPanel snapshot={advisor.snapshot} playing={advisor.playing} />}
    </main>
  );
}
