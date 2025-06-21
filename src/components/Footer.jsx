import React from "react";
import "../App.css";
import logo from "../assets/logo.png";
import discordIcon from "../assets/discord.png";
import instagramIcon from "../assets/instagram.png";
import telegramIcon from "../assets/telegram.png";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="FooterContent">
        <img src={logo} alt="logo" />
        <div className="FooterContacts">
          <div className="FooterSectionOne">
            <a
              href="https://github.com/Margin-interteiment/vista"
              target="_blank"
            >
              <p>Про Vista</p>
            </a>
            <a href="https://github.com/Hanashiko" target="_blank">
              <p>Автори проекту</p>
            </a>
          </div>
          <div className="FooterSectionTwo">
            <p>Наші контакти</p>
            <ul className="SocialIcons">
              <li className="SocialIconItem">
                <a href="https://discord.com/" target="_blank">
                  <img src={discordIcon} alt="Discord" />
                </a>
              </li>
              <li className="SocialIconItem">
                <a href="#" target="_blank">
                  <img src={instagramIcon} alt="Instagram" />
                </a>
              </li>
              <li className="SocialIconItem">
                <a href="https://web.telegram.org/a/" target="_blank">
                  <img src={telegramIcon} alt="Telegram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
