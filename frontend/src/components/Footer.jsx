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
            <p>Про Vista</p>
            <p>Автори проекту</p>
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
                <a
                  href="https://www.instagram.com/xq.iris?igsh=MTFvcDR4bzA2emtvdQ=="
                  target="_blank"
                >
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
