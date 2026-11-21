"use client";

import { Chips, InputRow, ProgressPill, StatusBar, useInputFocus } from "./controls";
import { OfferCard } from "./offer-card";
import { OpenPoints } from "./open-points";
import { SavingsSlip } from "./savings-slip";
import { Stage } from "./stage";
import { Transcript } from "./transcript";
import { useAdvisor } from "./use-advisor";
import { Welcome } from "./welcome";
import { useSpeechInput } from "./use-speech-input";

/**
 * Layouts by screen:
 * - mobile (< 768 px): one column that scrolls, compact stage.
 * - tablet (768-1023 px): one column that fits the window exactly: the stage takes 3/5 of the height, the
 *   conversation 2/5. Nothing scrolls except the conversation itself.
 * - web (>= 1024 px): the same, in two columns: the stage on the left, conversation, chips and input on the right.
 */
export function AdvisorShell() {
  const advisor = useAdvisor();
  const input = useInputFocus();

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
    <div className="min-h-screen bg-canvas md:flex md:h-dvh md:min-h-[35rem] md:flex-col">
      <StatusBar />
      <main className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 md:flex md:min-h-0 md:max-w-3xl md:flex-1 md:flex-col md:px-6 md:pb-5 md:pt-4 lg:max-w-6xl lg:px-8 lg:pb-6 lg:pt-5">
        <div className="flex flex-col gap-4 md:grid md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,3fr)_minmax(0,2fr)] md:gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-6">
          <Stage world={advisor.world} figure={advisor.figure} pausedAt={pausedAt} status={<ProgressPill mode={advisor.mode} backup={availability.backup} main={advisor.mainStep} side={advisor.sideStep} canContinue={snapshot !== null} />} />
          <div className="flex min-w-0 flex-col gap-4 md:min-h-0 md:gap-3">
            {advisor.mode === "idle" && advisor.log.length === 0 && !advisor.line ? (
              <Welcome onSay={advisor.say} onStart={advisor.start} />
            ) : (
              <>
                <Transcript log={advisor.log} line={advisor.line} lineKind={advisor.lineKind} />
                {advisor.points.length > 0 && (
                  <div className="md:max-h-44 md:shrink-0 md:overflow-y-auto">
                    <OpenPoints points={advisor.points} onAnswer={advisor.answer} onForget={advisor.forget} />
                  </div>
                )}
                {advisor.slip && (
                  <div className="md:max-h-56 md:shrink-0 md:overflow-y-auto">
                    <SavingsSlip slip={advisor.slip} onClose={advisor.closeSlip} />
                  </div>
                )}
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
              onStop={() => advisor.interrupt(true)}
              onMicDown={() => {
                advisor.interrupt();
                mic.start();
              }}
              onMicUp={mic.stop}
              inputRef={input.ref}
            />
            <p className="text-xs leading-5 text-faint md:shrink-0">
              {liveText} · {advisor.availability.voiceLine} · {micText}
            </p>
            {advisor.error && <p className="text-xs text-coral-ink">{advisor.error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
