import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Flag from 'react-world-flags';
import { IconCalendar, IconDeviceLaptop, IconMapPin } from '@tabler/icons-react';

import { technologies as t } from '@/utils/technologies';
import { seniorityLevelToText, remoteToText } from '@/utils/jobOffers';

import Salary from '@/components/JobOfferSalary';

import s from './styles.module.scss';

dayjs.extend(relativeTime);

const dateToDays = (date: string) => {
  return dayjs(date).fromNow();
};

export default function JobOffer({ offer }: { offer: any }) {
  const technologyIcon = t[offer.technology.name] ? t[offer.technology.name].icon : 'devicon';
  const technologyBg = t[offer.technology.name] ? t[offer.technology.name].color : '#858585';
  const devicon = `devicon-${technologyIcon}-plain`;

  return (
    <div className={s.offer}>
      <Link href={'#'} className={s.offerHeader}>
        <div className={s.headerLeft}>
          <div className={s.technologyIcon} style={{ background: technologyBg }}>
            <i className={devicon}></i>
          </div>
          <div>
            <h2 className={s.title}>{offer.title}</h2>
            <p className={s.company}>Company name</p>
          </div>
        </div>
        <div className={s.headerRight}>
          {offer['ua_supported'] ? (
            <>
              <Flag code="ua" height="10" />
            </>
          ) : (
            ''
          )}
          <span className={s.category}>
            <IconMapPin size="10" /> PL
          </span>
        </div>
      </Link>
      <div className={s.salaries}>
        <div className={s.seniority}>{seniorityLevelToText(offer.seniority)}</div>
        <Salary contracts={offer.contracts} />
      </div>
      <div className={s.offerInfo}>
        <p className={s.postedDate}>
          <IconCalendar size={14} /> Posted {dateToDays(offer['created_at'])}
        </p>
        <p className={s.remote}>
          <IconDeviceLaptop size={14} /> <span className={s.remoteText}>{remoteToText(offer.remote)} | Full-Time</span>
        </p>
      </div>
    </div>
  );
}
