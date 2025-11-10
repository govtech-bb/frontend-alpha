/**
 * Reusable summary section for check-answers pages
 * Displays a titled section with a "Change" link that navigates to the specified step
 *
 * @example
 * ```typescript
 * <SummarySection
 *   title="Applicant Details"
 *   stepName="applicant-details"
 *   onEdit={onEdit}
 * >
 *   <dl className="flex flex-col gap-2 font-normal text-[20px] leading-[1.7] lg:grid lg:grid-cols-3 lg:gap-4 [&_dt]:font-bold">
 *     <dt>Full name</dt>
 *     <dd className="lg:col-span-2">{formData.applicantName}</dd>
 *   </dl>
 * </SummarySection>
 * ```
 */
export function SummarySection<TStepName extends string>({
  title,
  stepName,
  onEdit,
  children,
}: {
  /** Section title */
  title: string;
  /** Step identifier to navigate to when "Change" is clicked */
  stepName: TStepName;
  /** Callback to navigate to the specified step */
  onEdit: (step: TStepName) => void;
  /** Section content (typically a definition list) */
  children: React.ReactNode;
}) {
  return (
    <div className="border-neutral-grey border-b-4 pb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-4 font-bold text-[40px] leading-[1.25] lg:mb-0">
          {title}
        </h2>
        <button
          className="hidden text-teal-dark underline hover:text-teal-dark/80 lg:inline"
          onClick={() => onEdit(stepName)}
          type="button"
        >
          Change
        </button>
      </div>
      {children}
      <button
        className="mt-2 font-normal text-[20px] text-teal-dark leading-[1.7] underline hover:text-teal-dark/80 lg:hidden"
        onClick={() => onEdit(stepName)}
        type="button"
      >
        Change
      </button>
    </div>
  );
}
