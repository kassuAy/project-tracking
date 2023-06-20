import clsx from 'clsx';
import Image from 'next/image';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
// import Rafiki from '../../public/rafiki.png';
// TODO: fix ui bug on the footer icons overlap on small screen size
export interface FooterProps {
  text?: string;
  contact?: string;
  home?: string;
  projects?: string;
  aboutUs?: string;
  address?: string;
  groups?: string;
}
export const Footer = ({
  text = 'Student Project Tracking System',
  contact = 'sis@aau.et',
  home = 'Home',
  projects = 'Projects',
  aboutUs = 'About Us',
  groups = 'Groups',
  address = '6 kilo FBE, Addis Ababa University, Addis Ababa, Ethiopia',
}: FooterProps) => {
  return (
    <>
      <hr className={clsx('')} />

      <footer className="py-6 bg-gray-200">
        <div className={clsx('grid grid-cols-4 mx-auto pl-96 pr-48 pb-5 pt-5')}>
          <div>
            <a href="">
              <p className={clsx('text-gray-500')}>Home</p>
            </a>
          </div>

          <div>
            <p className={clsx('text-gray-500')}>About</p>
          </div>
          <div>
            <a href="">
              <p className={clsx('text-gray-500')}>Projects</p>
            </a>
          </div>

          <div>
            <a href="">
              <p className={clsx('text-gray-500')}>Contact Us</p>
            </a>
          </div>
        </div>

        <div className={clsx('grid grid-cols-2 gap-5 mx-auto pl-96 pb-5')}>
          <div>
            <a href="">
              <p className={clsx('text-gray-500')}>
                6 kilo FBE, Addis Ababa University, Addis Ababa, Ethiopia
              </p>
            </a>
          </div>

          <div>
            <p className={clsx('text-gray-500')}>sis@aau.et</p>
          </div>
        </div>

        <div className="container mx-auto text-center text-gray-500">
          <p>© 2023 | School of Information Science. All rights reserved. </p>
        </div>

        <div className="sm:mr-6 text-center pt-6 ">
          <a href="">
            <FaTwitter
              className={clsx('inline-block text-xl cursor-pointer mx-2')}
            />
          </a>
          <a href="">
            <FaFacebook
              className={clsx('inline-block text-xl cursor-pointer mx-2')}
            />
          </a>
          <a href="">
            <FaYoutube
              className={clsx('inline-block text-xl cursor-pointer mx-2')}
            />
          </a>
          <a href="">
            <FaLinkedin
              className={clsx('inline-block text-xl cursor-pointer mx-2')}
            />
          </a>
          <a href="">
            <FaInstagram
              className={clsx('inline-block text-xl cursor-pointer mx-2')}
            />
          </a>
        </div>
      </footer>
    </>
  );
};