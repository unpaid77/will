/**
 * @author suraj kumar
 * @email surajknkumar@gmail.com
 * @Owner Will
 */
import {REGISTER_name, ADDRESS} from '../_helpers/ImageProvide';
export const GOOGLE_API_KEY = 'AIzaSyBreh0sI9BcJ_36QdIcezkh3tc2DSkynYM';
export const IMAGE_CDN = 'https://willapps.s3.me-south-1.amazonaws.com/';
export const FRESS_CHAT_APP_ID = '070eb9a1-adc0-4e6d-abc3-aae519e3f242';
export const FRESS_CHAT_APP_KEY = 'ff32c43d-689f-49e0-b23d-b630f1bb2010';
export const FRESS_CHAT_DOMAIN = 'msdk.in.freshchat.com';

export const ADDRESS_LABEL = [
  {
    icon: 'user',
    image: REGISTER_name,
    type: 'text',
    key: 'name',
    placeholder: 'Name',
  },
  {
    icon: '',
    image: ADDRESS,
    type: 'text',
    key: 'floor',
    placeholder: 'Floor',
  },
  {
    icon: '',
    image: REGISTER_name,
    type: 'text',
    key: 'block',
    placeholder: 'Block',
  },
  {
    icon: '',
    image: REGISTER_name,
    type: 'text',
    key: 'apartment_number',
    placeholder: 'Apartment Number',
  },
  {
    icon: '',
    image: REGISTER_name,
    type: 'text',
    key: 'street',
    placeholder: 'Street',
  },
  {
    icon: '',
    image: REGISTER_name,
    type: 'text',
    key: 'building',
    placeholder: 'Building',
  },
  {
    icon: '',
    image: REGISTER_name,
    type: 'text',
    key: 'area',
    placeholder: 'Area',
  },
  {
    icon: '',
    image: REGISTER_name,
    type: 'text',
    key: 'additional_direction',
    placeholder: 'Additional Direction',
  },
  {
    icon: '',
    image: REGISTER_name,
    type: 'select',
    key: 'address_type',
    placeholder: 'Address Type',
  },
  {
    icon: '',
    image: REGISTER_name,
    type: 'checkbox',
    key: 'is_default_address',
    placeholder: 'is_default_address',
  },
];
export const CALANDER_CONFIG = {
  en: {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mar',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
  },
  ar: {
    monthNames: [
      'كانون الثاني',
      'شهر فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'اكتوبر',
      'شهر نوفمبر',
      'ديسمبر',
    ],
    monthNamesShort: [
      'كانون الثاني',
      'شهر فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'اكتوبر',
      'شهر نوفمبر',
      'ديسمبر',
    ],
    dayNames: [
      'الأحد',
      'الإثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ],
    dayNamesShort: [
      'الأحد',
      'الإثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ],
    today: 'اليوم',
  },
};
export const WEEK_LIST = {
  en: [
    {
      key: 2,
      text: 'Week 2',
    },
    {
      key: 3,
      text: 'Week 3',
    },
    {
      key: 4,
      text: 'Week 4',
    },
    {
      key: 5,
      text: 'Week 5',
    },
    {
      key: 6,
      text: 'Week 6',
    },
    {
      key: 7,
      text: 'Week 7',
    },
    {
      key: 8,
      text: 'Week 8',
    },
  ],
  ar: [
    // {
    //   key: 1,
    //   text: 'أسبوع ٠',
    // },
    {
      key: 2,
      text: 'أسبوع ١',
    },
    {
      key: 3,
      text: 'أسبوع ٢',
    },
    {
      key: 4,
      text: 'أسبوع ٣',
    },
    {
      key: 5,
      text: 'أسبوع ٤',
    },
    {
      key: 6,
      text: 'أسبوع ٥',
    },
    {
      key: 7,
      text: 'أسبوع ٦',
    },
    {
      key: 8,
      text: 'أسبوع ٧',
    },
  ],
};

export const MEAL = {
  day: null,
  plan_diet_package_id: null,
  meal_type: null,
  meal_id: null,
};

export const DIET_COMPANY = [
  {
    restaurant_id: null,
    week: null,
    plan_id: null,
    plan_packages_id: null,
    meals: [],
  },
];

export const CART_DATA = {
  type: null,
  start_date: null,
  duration_type: null,
  duration: null,
  gender: null,
  plan_type: null,
  relative_id: null,
  diet_company: [],
};

export const MealListData = [
  {
    type: 'Breakfast',
    selected: true,
    data: null,
    meal_type: null,
    plan_diet_package_id: null,
    mealID: null,
    mealListId: null,
    plan_id: null,
    plan_packages_id: null,
  },
  {
    type: 'Lunch',
    meal_type: null,
    selected: false,
    plan_diet_package_id: null,
    data: null,
    mealID: null,
    mealListId: null,
    plan_packages_id: null,
    plan_id: null,
  },
  {
    type: 'Dinner',
    meal_type: null,
    plan_diet_package_id: null,
    selected: false,
    data: null,
    mealID: null,
    mealListId: null,
    plan_packages_id: null,
    plan_id: null,
  },
];
