import Link from 'next/link';
import Image from 'next/image';
import { IconChevronDown } from '@tabler/icons-react';
import { Button } from '@mantine/core';

import s from './styles.module.scss';

export default function Header() {
  return (
    <header className={s.header}>
      <nav className={`container-lg ${s.nav}`}>
        <Link href={'#'} className={s.logoLink}>
          <Image src="/logo.svg" alt="" width="180" height="50" className={s.logo} />
        </Link>
        <ul className={s.list}>
          <li className={s.listItem}>
            <Link href={'#'} className={s.listLink}>
              <span className={s.listLinkText}>Overview</span>
            </Link>
          </li>
          <li className={s.listItem}>
            <div className={`${s.listLink} ${s.listLinkDropdown}`}>
              <span className={s.listLinkText}>Jobs</span>
              <IconChevronDown className={s.listLinkIcon} />
            </div>
            <div className={s.dropdown}>
              <div className={s.dropdownInner}>
                <div className={s.dropdownArea}>
                  <div className={s.dropdownGroup}>
                    <p className={s.dropdownLabel}>Industries</p>
                    <ul className={s.dropdownList}>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Healthcarte
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Fintech
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Telecommunication
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Engineering
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Retail
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Public Sector
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={s.dropdownArea}>
                  <div className={s.dropdownGroup}>
                    <p className={s.dropdownLabel}>Categories</p>
                    <ul className={s.dropdownList}>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Ruby on Rails
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          ASP.NET
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Haskell
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Spring Boot
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Angular
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={s.dropdownArea}>
                  <div className={s.dropdownGroup}>
                    <p className={s.dropdownLabel}>Countries</p>
                    <ul className={s.dropdownList}>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Poland
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          France
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Slovakia
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Canada
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={s.listItem}>
            <div className={`${s.listLink} ${s.listLinkDropdown}`}>
              <span className={s.listLinkText}>Companies</span>
              <IconChevronDown className={s.listLinkIcon} />
            </div>
            <div className={s.dropdown}>
              <div className={s.dropdownInner}>
                <div className={s.dropdownArea}>
                  <div className={s.dropdownGroup}>
                    <p className={s.dropdownLabel}>Top companies</p>
                    <ul className={s.dropdownList}>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Xebia Poland
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Mobitouch
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          SoftSystem
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Cetus.Pro
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          37signals
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          VirtusLab
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Netguru
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={s.dropdownArea}>
                  <div className={s.dropdownGroup}>
                    <p className={s.dropdownLabel}>Business typess</p>
                    <ul className={s.dropdownList}>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Saas products
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Software houses
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Startups
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Corporations
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Interactive agencies
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={s.dropdownLink}>
                          Product companies
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={s.dropdownArea}>
                  <div className={s.dropdownGroup}>
                    <p className={s.dropdownLabel}>Latest blog post</p>
                    <Link href={'#'} className={s.blogPost}>
                      <img src="https://picsum.photos/300/180" alt="" className={s.blogPostImage} />
                      <h2 className={s.blogPostTitle}>How big impact does COVID-19 had on the IT industry?</h2>
                      <p className={s.blogPostText}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eveniet.1
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={s.listItem}>
            <Link href={'#'} className={s.listLink}>
              <span className={s.listLinkText}>Remote</span>
            </Link>
          </li>
        </ul>
        <div className={s.navButtons}>
          <Button variant="outline" color="#ffffff">
            Sign In
          </Button>
          <Button>Post a job offer</Button>
        </div>
      </nav>
    </header>
  );
}
