import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          report: {
            Customer: 'Customer',
            dateCreated: 'Date Created',
            BoardID: 'Board ID',
            DateToDB: 'Date to DB',
            Comment: 'Comment',
            'Farm type': 'Farm Type',
            Location: 'Location',
            House: 'House',
            'Union No': 'Union No',
            'Farm No': 'Farm No',
            InHouseLoc: 'InHouseLoc',
            Age: 'Age',
            'Broiler family': 'Broiler Family',
            'Flock size': 'Flock Size',
            Mortality: 'Mortality',
            Disease: 'Disease',
          },
          device: {
            Customer: 'Customer',
            DateUpdated: 'Date Updated',
            Location: 'Location',
            House: 'House',
            InHouseLoc: 'InHouseLoc',
            FW: 'Firmware Version',
            Adapters: 'Adapters',
            Online: 'Online',
            Cycle: 'Cycle',
            Stage: 'Stage',
          },
          SignIn: {
            title: 'Sign In',
            user: {
              label: 'Username',
              error: { required: 'Username is a required field' },
            },
            buttonLogin: 'Login',
          },
          signOut: 'Sign Out',
          ChooseReport: {
            title: 'Choose Report',
            empty: 'No reports found',
          },
          DevicesInfo: {
            title: 'Devices Info',
            empty: 'No devices found',
          },
          ManageDevices: {
            title: 'Manage Devices',
          },
        },
      },
    },
  })
  .then()
