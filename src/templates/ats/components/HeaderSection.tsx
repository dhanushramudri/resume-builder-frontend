import { ContactDetail } from '../atoms/ContactDetail';
import { HeaderTitle } from '../atoms/HeaderTitle';
export const HeaderSection = ({
  name,
  contactDetails,
}: {
  name: string;
  contactDetails: string[];
}) => (
  <div className="text-center mb-4">
    <h1 className="text-2xl font-bold">{name}</h1>
    <div className="flex flex-wrap justify-center gap-2">
      {contactDetails.map((detail, index) => (
        <p key={index} className="text-sm">
          {detail}
        </p>
      ))}
    </div>
  </div>
);
