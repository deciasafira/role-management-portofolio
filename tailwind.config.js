const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        // default v2
        'primary': '#38389A',
        'secondary': '#A09898',
        'tertiary': '#FFF',
        'error': '#DB484A',
        'container': '#1E1E2C',
        'high-container': '#313242',
        'primary-container': '#2A2A4D',
        'low-container': '#8F8FA1',
        'success': '#44C4A1',
        'on-error': '#8C1010',
        'variant-on-surface': '#F0F0F0',
        'outline': '#4E4E4E',
        'base-surface': '#1E1E2C',
        'error-hover': '#F06365',
        'secondary-hover': '#D3C7C7',


        // default v1
        'body': '#FFF',
        'main-blue': '#4893E6',
        'main-gray': '#F5F5F5',
        'gray-font': '#696969',
        'tags-container': '#D9D9D9',
        'light-secondary': '#A09898',
        'light-error': '#DB484A',
        'border-outline': "#4E4E4E",
        'light-primary': '#2E6ADF',
        'light-surface-container-low': '#F5F5F5',

        // Dark Mode
        'dark-main-blue': '#374151',
        'dark-main-gray': '#1F2937',
        'dark-gray-font': '#C0C0C0',
        'dark-tags-container': '#1F2937',
        'dark-secondary': '#777777',
        'dark-error': '#DB484A',
        'dark-border-outline': '#666666',
        'dark-primary': '#2468AC',
        'dark-surface-container-low': '#1F2937',

        main: '#4893E6',
        bgMain: '#F5F5F5',
        grayFont: '#696969',

      },
      inset: {
        'edit-user': '22px',
        'role-table': '1.175rem',
        'user-list': '32.5px',
      },
      width: {
        'sidebar': '6%',
        'search': '38.47%',
        'rowsPerPage': '18%',
        'pagination': '85%',
        'dropdownCategory': '18.22%',
        'dropdownItemsPerPage': '3%',
        'edit-roles': '75.1rem',
        'detail-roles': '55.8rem',
        'category-list': '14.9rem',
        'rows-per-page': '4.5rem',
      },
      margin: {
        'itemsPerPage': '8.5rem',
        'items-per-page': '10.15rem',
        'search': '22rem',
        'category-list': '1rem',
      },
      text: {
        header: {
          'font-size': '1.5rem',
          'line-height': '2.5rem',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [plugin(function ({ addBase }) {
    addBase({
      '@font-face': {
        fontFamily: 'Montserrat',
        fontWeight: '400',
        src: 'url(/src/static/Montserrat-Regular.ttf)',
      },
    });
  }),
  plugin(function ({ addBase }) {
    addBase({
      '@font-face': {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        src: 'url(/src/static/Montserrat-Medium.ttf)',
      },
    });
  }),
  plugin(function ({ addBase }) {
    addBase({
      '@font-face': {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        src: 'url(/src/static/Montserrat-SemiBold.ttf)',
      },
    });
  }),
  plugin(function ({ addBase }) {
    addBase({
      '@font-face': {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        src: 'url(/src/static/Montserrat-Bold.ttf)',
      },
    });
  }),
  plugin(function ({ addBase }) {
    addBase({
      '@font-face': {
        fontFamily: 'Montserrat',
        fontWeight: '800',
        src: 'url(/src/static/Montserrat-ExtraBold.ttf)',
      },
    });
  }),],
}
