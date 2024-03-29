import React from 'react'
import "./footer.css";
function Footer() {
  return (
    <div>
          <footer>
        <div className="row footer__row">
            <a href="#" className="footer__anchor">
                <p className="footer_p">
                    M2L
                </p>
                <span className="footer__logo--popper">
                    Top
                    <i className="fas fa-arrow-up"></i>
                </span>
            </a>
            <div className="footer__copyright">Copyright © 2023 All rights reserved </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer;
