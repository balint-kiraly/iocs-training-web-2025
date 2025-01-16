import Image from 'next/image';

export default function ContactCard({
  name,
  role,
  email,
  phone,
  image,
}: {
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
}) {
  return (
    <div className='flex flex-col items-center rounded-lg bg-white p-6 shadow-md'>
      <Image src={image} alt={name} height={140} width={140} className='mb-4 rounded-full object-cover' />
      <h2 className='text-xl font-bold text-gray-800'>{name}</h2>
      <p className='text-gray-600'>{role}</p>
      <a
        href={`mailto:${email}`}
        className={`
          mt-2 text-blue-500

          hover:underline
        `}
      >
        {email}
      </a>
      <a
        href={`tel:${phone}`}
        className={`
          mt-1 text-blue-500

          hover:underline
        `}
      >
        {phone}
      </a>
    </div>
  );
}
