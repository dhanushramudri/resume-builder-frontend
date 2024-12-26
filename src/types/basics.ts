export interface IBasics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  relExp?: string;
  totalExp?: string;
  location: {
    address?: string;
    postalCode?: string;
    city?: string;
    countryCode?: string;
    region?: string;
  };
  profiles: {
    network: string;
    username: string;
    url: string;
  }[];
}
