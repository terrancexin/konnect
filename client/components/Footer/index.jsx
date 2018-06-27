import React from 'react';

const Footer = () => {
  const icons = {
    angellist: 'https://angel.co/terrancexin',
    instagram: 'https://www.instagram.com/txin/',
    linkedin: 'https://www.linkedin.com/in/terrancexin/',
    github: 'https://github.com/terrancexin/konnect',
    globe: 'https://www.terrancexin.com',
  };

  return (
    <footer className="footer-icons">
      {Object.keys(icons).map((key) => {
          const link = icons[key];

          return (
            <a
              href={link}
              title={key}
              target="_blank"
              rel="noreferrer noopener"
              key={key}
            >
              {key !== 'globe' && <i className={`fab fa-${key}`} />}
              {key === 'globe' && <i className={`fa fa-${key}`} />}
            </a>
          );
        })}
    </footer>
  );
};

export default Footer;
