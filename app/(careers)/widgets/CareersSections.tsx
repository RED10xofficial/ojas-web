"use client";

import { useState } from "react";
import CareersPerks from "./CareersPerks";
import CareersPositions from "./CareersPositions";
import CareersApplicationForm from "./CareersApplicationForm";
import type {
  CareersPageSection,
  CareersPerksSection,
  CareersPositionsSection,
  CareersApplicationFormSection,
  CareersJobRole,
} from "@/app/lib/types";

/**
 * Careers sections share state — picking a role in the positions list
 * preselects it in the application form — so they are rendered together
 * here rather than through the generic SectionRenderer.
 */
export default function CareersSections({
  sections,
}: {
  sections?: CareersPageSection[];
}) {
  /**
   * `pick` increments on every selection so that re-picking the same role
   * still counts as a fresh choice, overriding any manual dropdown change.
   */
  const [selection, setSelection] = useState({ role: "", pick: 0 });
  const selectRole = (roleTitle: string) =>
    setSelection((prev) => ({ role: roleTitle, pick: prev.pick + 1 }));

  const perks = sections?.find(
    (s): s is CareersPerksSection =>
      s.__component === "careers-page.careers-perks-section",
  );
  const positions = sections?.find(
    (s): s is CareersPositionsSection =>
      s.__component === "careers-page.careers-positions-section",
  );
  const form = sections?.find(
    (s): s is CareersApplicationFormSection =>
      s.__component === "careers-page.careers-application-form-section",
  );

  /* Flatten the grouped departments into the dropdown's option list */
  const roles: CareersJobRole[] =
    positions?.departments?.flatMap((dept) => dept.roles) ?? [];

  return (
    <>
      <CareersPerks data={perks} wrapperClass={perks?.wrapperClass} />
      <CareersPositions
        data={positions}
        wrapperClass={positions?.wrapperClass}
        onRoleSelect={selectRole}
        formAnchorId={form?.anchorId ?? "apply-form"}
      />
      <CareersApplicationForm
        data={form}
        wrapperClass={form?.wrapperClass}
        selectedRole={selection.role}
        selectionId={selection.pick}
        roles={roles}
      />
    </>
  );
}
