import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPageComponent.css';
import bat from '../../img/bat.gif';
import catFace from '../../img/cat-face.gif';
import cat from '../../img/cat_landing.gif';
import mario from '../../img/mario.gif';
import linkedin from '../../img/linkedin.png';
import github from '../../img/github.png';
import telegram from '../../img/telegram.png';

class LandingPageComponent extends Component {
    render() {
        return (
            <div className="landing-page-component">
                <div className="landing-page">
                    <div className="landing-page-screenshot">
                        <Link to="/main" className="link-to-main-page">
                            Create Sprite
                        </Link>
                        <div className="example-functional-image" />
                    </div>
                    <div className="landing-page-overview_functionality">
                        <p>Overview functionality</p>
                        <ul>
                            <li>
                                Tools
                                <ul>
                                    <li>Pen. 3 sizes</li>
                                    <li>Color Select</li>
                                    <li>Paint bucket (Primary)</li>
                                    <li>Eraser. 3 Sizes</li>
                                    <li>Mirror Pen</li>
                                    <li>Color Picker</li>
                                    <li>Rectangle</li>
                                    <li>Circle</li>
                                    <li>Stroke (to draw straight lines)</li>
                                    <li>Chess Board Draw</li>
                                    <li>Lighten</li>
                                    <li>Darken</li>
                                    <li>Move Tool</li>
                                    <li>Paint all pixels of the same color </li>
                                </ul>
                            </li>
                            <li>
                                Preview
                                <ul>
                                    <li>
                                        Small animation preview window in the
                                        top right corner
                                    </li>
                                    <li>Full screen mode</li>
                                    <li>
                                        Show cursor coordinates / canvas size
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Frames
                                <ul>
                                    <li>Ability to add/delete a frame</li>
                                    <li>Ability to duplicate a frame</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="landing-page-animation-examples">
                        <img
                            src={catFace}
                            alt="catFace"
                            width="150px"
                            height="150px"
                            className="landing-page-animation-image"
                        />
                        <img
                            src={bat}
                            alt="bat"
                            width="150px"
                            height="150px"
                            className="landing-page-animation-image"
                        />
                        <img
                            src={cat}
                            alt="cat"
                            width="150px"
                            height="150px"
                            className="landing-page-animation-image"
                        />
                        <img
                            src={mario}
                            alt="mario"
                            width="150px"
                            height="150px"
                            className="landing-page-animation-image"
                        />
                    </div>
                    <div className="landing-page-author-information">
                        <p>by Pavel Leskavets, RSSchool 2019Q1</p>
                        <a
                            href="https://www.linkedin.com/in/%D0%BF%D0%B0%D0%B2%D0%B5%D0%BB-%D0%BB%D0%B5%D1%81%D0%BA%D0%BE%D0%B2%D0%B5%D1%86-9465bb170/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={linkedin}
                                alt="linkedin"
                                width="22px"
                                height="22px"
                                className="landing-page-footer-img"
                            />
                        </a>
                        <a
                            href="https://github.com/pavel-leskavets"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={github}
                                alt="github"
                                width="24px"
                                height="23px"
                                className="landing-page-footer-img"
                            />
                        </a>
                        <a
                            href="https://t.me/jake_epping"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={telegram}
                                alt="telergam"
                                width="24px"
                                height="23px"
                                className="landing-page-footer-img"
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPageComponent;
