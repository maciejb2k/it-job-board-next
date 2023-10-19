import { technologies as t } from '@/utils/technologies';

import s from './JobOffer.module.scss';

export default function JobOffer({ offer }: { offer: any }) {
  const technologyIcon = t[offer.technology.name] ? t[offer.technology.name].icon : 'devicon';
  const technologyBg = t[offer.technology.name] ? t[offer.technology.name].color : '#858585';
  const devicon = `devicon-${technologyIcon}-plain`;

  return (
    <div className={s.offer}>
      <header className={s.offerHeader}>
        <div className={s.technologyIcon} style={{ background: technologyBg }}>
          <i className={devicon}></i>
        </div>
        <div>
          <h2 className={s.title}>{offer.title}</h2>
          <p className={s.company}>Company name</p>
        </div>
      </header>
    </div>
  );
}
