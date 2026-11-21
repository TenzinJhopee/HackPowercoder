"use client";

import { useState } from "react";
import { Chips, InputRow, ModeLine, StatusBar, StepBar, useInputFocus } from "./controls";
import { OfferCard } from "./offer-card";
import { ScriptPanel } from "./script-panel";
import { Stage } from "./stage";
import { Transcript } from "./transcript";
import { useAdvisor } from "./use-advisor";
import { Welcome } from "./welcome";
import { useSpeechInput } from "./use-speech-input";

/**
 * Layouts by screen:
 * - mobile (< 768 px): one column, compact stage.
 * - tablet (768-1023 px): one wider column, taller stage.
 * - web (>= 1024 px): two columns, the stage on the left and caption, chips and input on the right.
 */
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
    <div className="min-h-screen bg-canvas">
      <StatusBar
        sound={advisor.sound}
        scriptOpen={scriptOpen}
        onSound={() => advisor.setSound(!advisor.sound)}
        onScript={() => setScriptOpen((open) => !open)}
      />
      <main className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 md:max-w-3xl md:px-6 md:pt-6 lg:max-w-6xl lg:px-8 lg:pt-8">
        <div className="space-y-2.5 pb-4 lg:pb-6">
          <ModeLine mode={advisor.mode} backup={availability.backup} />
          <StepBar main={advisor.mainStep} side={advisor.sideStep} mode={advisor.mode} />
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-6">
          <Stage world={advisor.world} figure={advisor.figure} pausedAt={pausedAt} />
          <div className="flex min-w-0 flex-col gap-4">
            {advisor.mode === "idle" && advisor.log.length === 0 && !advisor.line ? (
              <Welcome onSay={advisor.say} onStart={advisor.start} />
            ) : (
              <>
                <Transcript log={advisor.log} line={advisor.line} lineKind={advisor.lineKind} thinking={advisor.mode === "side" && advisor.lineKind === "filler"} />
                {advisor.offer && <OfferCard confirmed={advisor.offerConfirmed} onConfirm={advisor.confirmOffer} />}
                <Chips
                  mode={advisor.mode}
                  canContinue={snapshot !== null}
                  question={advisor.question}
                  onAnswer={advisor.answer}
                  onStart={advisor.start}
                  onSay={advisor.say}
                  onResume={advisor.resume}
                  onMore={() => {
                    advisor.interrupt();
                    input.focus();
                  }}
                />
              </>
            )}
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
            {advisor.error && <p className="text-xs text-coral-ink">{advisor.error}</p>}
            {scriptOpen && <ScriptPanel snapshot={advisor.snapshot} playing={advisor.playing} />}
          </div>
        </div>
      </main>
    </div>
  );
}
