import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Tooltip } from '@mantine/core';
import Flag from 'react-world-flags';

import { technologies as t } from '@/utils/technologies';
import { seniorityLevelToText, remoteToText } from '@/utils/jobOffers';

import s from './JobOffer.module.scss';
import { IconCalendar, IconDeviceLaptop, IconMapPin } from '@tabler/icons-react';
import Link from 'next/link';

import Salary from '@/components/JobOfferSalary';

dayjs.extend(relativeTime);

const dateToDays = (date: string) => {
  return dayjs(date).fromNow();
};

const dateToFull = (date: string) => {
  return dayjs(date).format('DD MMM YYYY');
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
              <Tooltip arrowOffset={10} arrowSize={4} label="UA supported" withArrow position="top-start">
                <Flag code="ua" height="10" />
              </Tooltip>
            </>
          ) : (
            ''
          )}
          <Tooltip arrowOffset={10} arrowSize={4} label="Poland" withArrow position="top-start">
            <span className={s.category}>
              <IconMapPin size="10" /> PL
            </span>
          </Tooltip>
        </div>
      </Link>
      <div className={s.salaries}>
        <div className={s.seniority}>{seniorityLevelToText(offer.seniority)}</div>
        <Salary contracts={offer.contracts} />
      </div>
      <div className={s.offerInfo}>
        <Tooltip arrowOffset={10} arrowSize={4} label={dateToFull(offer['created_at'])} withArrow position="top-start">
          <p className={s.postedDate}>
            <IconCalendar size={14} /> Posted {dateToDays(offer['created_at'])}
          </p>
        </Tooltip>
        <p className={s.remote}>
          <IconDeviceLaptop size={14} /> <span className={s.remoteText}>{remoteToText(offer.remote)} | Full-Time</span>
        </p>
      </div>
    </div>
  );
}
