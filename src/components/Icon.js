import React from 'react';
import styled from 'styled-components';
import color from '../assets/colors.scss';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(fas);
library.add(far);
library.add(fab);

// ARROW ICON
export const icon_chevronRight = <FontAwesomeIcon icon={['fas', 'chevron-right']} className='fa-fw' />;
export const icon_chevronLeft = <FontAwesomeIcon icon={['fas', 'chevron-left']} className='fa-fw' />;
export const icon_arrow_left = <FontAwesomeIcon icon={['fas', 'arrow-left']} className='fa-fw' />;

// SORT TABLE ICON
export const icon_sort_up = <FontAwesomeIcon icon={['fas', 'sort-up']} className='fa-fw' />;
export const icon_sort_down = <FontAwesomeIcon icon={['fas', 'sort-down']} className='fa-fw' />;
export const icon_sort_init = <FontAwesomeIcon icon={['fas', 'sort']} className='fa-fw' />;

export const icon_question_fr = <FontAwesomeIcon icon={['far', 'question-circle']} className='fa-fw'/>
export const icon_hint = <FontAwesomeIcon icon={['fas', 'question-circle']} className='fa-fw'/>
export const icon_pass_visible = <FontAwesomeIcon icon={['fas', 'eye']} className='fa-fw'/>
export const icon_pass_invisible = <FontAwesomeIcon icon={['fas', 'eye-slash']} className='fa-fw'/>

// MENU ICON
export const icon_home = <FontAwesomeIcon icon={['fas', 'home']} className='fa-fw'/>
export const icon_setting = <FontAwesomeIcon icon={['fas', 'wrench']} className='fa-fw'/>