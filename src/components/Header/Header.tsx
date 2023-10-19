import Image from 'next/image';
import { IconChevronDown } from '@tabler/icons-react';
import { Button } from '@mantine/core';

import styles from './Header.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={`container-lg ${styles.nav}`}>
        <Link href={'#'} className={styles.logoLink}>
          <Image src="/logo.svg" alt="" width="180" height="50" className={styles.logo} />
        </Link>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href={'#'} className={styles.listLink}>
              <span className={styles.listLinkText}>Overview</span>
            </Link>
          </li>
          <li className={styles.listItem}>
            <div className={`${styles.listLink} ${styles.listLinkDropdown}`}>
              <span className={styles.listLinkText}>Jobs</span>
              <IconChevronDown className={styles.listLinkIcon} />
            </div>
            <div className={styles.dropdown}>
              <div className={styles.dropdownInner}>
                <div className={styles.dropdownArea}>
                  <div className={styles.dropdownGroup}>
                    <p className={styles.dropdownLabel}>Industries</p>
                    <ul className={styles.dropdownList}>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Healthcarte
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Fintech
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Telecommunication
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Engineering
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Retail
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Public Sector
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.dropdownArea}>
                  <div className={styles.dropdownGroup}>
                    <p className={styles.dropdownLabel}>Categories</p>
                    <ul className={styles.dropdownList}>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Ruby on Rails
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          ASP.NET
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Haskell
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Spring Boot
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Angular
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.dropdownArea}>
                  <div className={styles.dropdownGroup}>
                    <p className={styles.dropdownLabel}>Countries</p>
                    <ul className={styles.dropdownList}>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Poland
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          France
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Slovakia
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Canada
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.listItem}>
            <div className={`${styles.listLink} ${styles.listLinkDropdown}`}>
              <span className={styles.listLinkText}>Companies</span>
              <IconChevronDown className={styles.listLinkIcon} />
            </div>
            <div className={styles.dropdown}>
              <div className={styles.dropdownInner}>
                <div className={styles.dropdownArea}>
                  <div className={styles.dropdownGroup}>
                    <p className={styles.dropdownLabel}>Top companies</p>
                    <ul className={styles.dropdownList}>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Xebia Poland
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Mobitouch
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          SoftSystem
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Cetus.Pro
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          37signals
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          VirtusLab
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Netguru
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.dropdownArea}>
                  <div className={styles.dropdownGroup}>
                    <p className={styles.dropdownLabel}>Business typess</p>
                    <ul className={styles.dropdownList}>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Saas products
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Software houses
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Startups
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Corporations
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Interactive agencies
                        </Link>
                      </li>
                      <li>
                        <Link href={'#'} className={styles.dropdownLink}>
                          Product companies
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.dropdownArea}>
                  <div className={styles.dropdownGroup}>
                    <p className={styles.dropdownLabel}>Latest blog post</p>
                    <Link href={'#'} className={styles.blogPost}>
                      <img src="https://picsum.photos/300/180" alt="" className={styles.blogPostImage} />
                      <h2 className={styles.blogPostTitle}>How big impact does COVID-19 had on the IT industry?</h2>
                      <p className={styles.blogPostText}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eveniet.1
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.listItem}>
            <Link href={'#'} className={styles.listLink}>
              <span className={styles.listLinkText}>Remote</span>
            </Link>
          </li>
        </ul>
        <div className={styles.navButtons}>
          <Button variant="outline" color="#ffffff">
            Sign In
          </Button>
          <Button>Post a job offer</Button>
        </div>
      </nav>
    </header>
  );
}
