"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GetStarted from "@/components/Onbaording/GetStarted";
import Register from "@/components/Onbaording/Register";
import Step1 from "@/components/Onbaording/step1";
import { AuroraBackground } from "@/components/aurora-background";

function Onboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<
    "getStarted" | "register" | "step1" | "step2"
  >("getStarted");

  const currentStepFromUrl = searchParams.get("step");

  useEffect(() => {
    if (currentStepFromUrl === "1") {
      setCurrentStep("step1");
      return;
    }

    if (currentStepFromUrl === null && currentStep === "step1") {
      setCurrentStep("register");
      return;
    }

    if (!currentStepFromUrl && currentStep === "getStarted") {
      setCurrentStep("getStarted");
    }
  }, [currentStep, currentStepFromUrl]);

  const goToStep = (nextStep: "register" | "step1") => {
    setCurrentStep(nextStep);

    if (nextStep === "step1") {
      router.replace("/onboarding?step=1", { scroll: false });
      return;
    }

    router.replace("/onboarding", { scroll: false });
  };

  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={60}>
      {currentStep === "getStarted" && (
        <GetStarted onGetStarted={() => goToStep("register")} />
      )}
      {currentStep === "register" && (
        <Register onContinue={() => goToStep("step1")} />
      )}
      {currentStep === "step1" && <Step1 onBack={() => goToStep("register")} />}
      {currentStep === "step2" && <Step1 onBack={() => goToStep("step1")} />}
    </AuroraBackground>
  );
}

export default Onboarding;
