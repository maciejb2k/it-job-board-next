'use client';

import { useJobOffers } from '@/providers/JobOffersContext';

import s from './styles.module.scss';

export default function JobOfferSalary({ contracts }: { contracts: any }) {
  const { employmentType } = useJobOffers();

  const filteredContracts = contracts.filter((contract: any) => contract.employment === employmentType);

  const renderSalaryInfo = (contract: any) => {
    if (contract.from && contract.to === 'undisclosed') {
      return <span className={s.salaryConfidential}>Confidential</span>;
    }

    const truncatedFrom = Math.trunc(contract.from);
    const truncatedTo = Math.trunc(contract.to);
    const currency = (
      <>
        <span className={s.salaryCurrency}>{contract.currency}</span>
      </>
    );

    return (
      <>
        {truncatedFrom} {currency} - {truncatedTo} {currency}
      </>
    );
  };

  return (
    <>
      {filteredContracts.map((contract: any) => (
        <div className={s.salary} key={contract.id}>
          <span className={s.salaryType}>{contract.employment}</span>
          <span className={s.salaryAmount}>{renderSalaryInfo(contract)}</span>
        </div>
      ))}
    </>
  );
}
