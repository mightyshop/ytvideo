import { countries } from './countries';

export interface Region {
  id: string;
  name: string;
  countries: typeof countries;
}

export const regions: Region[] = [
  {
    id: 'northAmerica',
    name: 'North America',
    countries: countries.filter(country => 
      ['US', 'CA', 'MX'].includes(country.code)
    )
  },
  {
    id: 'southAmerica',
    name: 'South America',
    countries: countries.filter(country => 
      ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE'].includes(country.code)
    )
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: countries.filter(country => 
      ['AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 
       'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC', 'ME', 'NL', 'NO', 
       'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'UA', 'GB', 'VA'].includes(country.code)
    )
  },
  {
    id: 'asia',
    name: 'Asia',
    countries: countries.filter(country => 
      ['AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'IN', 'ID', 'IR', 'IQ', 
       'IL', 'JP', 'JO', 'KZ', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'OM', 'PK', 
       'PH', 'QA', 'SA', 'SG', 'KR', 'LK', 'SY', 'TW', 'TJ', 'TH', 'TR', 'TM', 'AE', 'UZ', 'VN', 
       'YE'].includes(country.code)
    )
  },
  {
    id: 'africa',
    name: 'Africa',
    countries: countries.filter(country => 
      ['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'DJ', 'EG', 'GQ', 
       'ER', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 
       'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 
       'SD', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'].includes(country.code)
    )
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: countries.filter(country => 
      ['AU', 'FJ', 'KI', 'MH', 'FM', 'NR', 'NZ', 'PW', 'PG', 'WS', 'SB', 'TO', 'TV', 'VU'].includes(country.code)
    )
  }
];