import { Facebook, Instagram } from "lucide-react";

export default function Footer(){
  return (
    <header className="flex justify-between items-center p-4">

      <div className="flex items-center">
        <img
          src="/iocslogo44px.png"
          alt="IÖCS"
          className="w-10 h-10 object-contain"
        />
      </div>
      
      
      <div className="flex space-x-4">
    
        <a
          href="https://www.facebook.com/@instruktorok"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white-600 hover:text-blue-800"
          aria-label="Facebook"
        >
          <Facebook className="w-6 h-6" />
        </a>

  
        <a
          href="https://www.instagram.com/iocs_official/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white-500 hover:text-orange-700"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6" />
        </a>

        <a
          href="https://iocs.hu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white-600 hover:text-yellow-700"
          aria-label="Privacy Policy"
        >
          <img
          src="/privacy.png"
          alt="privacy"
          className="w-6 h-6 object-contain"
        />
        </a>
      </div>
    </header>
  );
}