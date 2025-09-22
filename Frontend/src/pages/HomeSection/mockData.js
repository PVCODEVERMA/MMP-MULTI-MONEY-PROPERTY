// 🖼 Import Images
import image01 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_01.avif";
import image02 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_02.avif";
import image03 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_03.avif";
import image04 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_04.avif";
import image05 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_05.avif";
import image06 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_06.avif";
import image07 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_07.avif";
import image08 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_08.avif";
import image09 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_09.avif";
import image10 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_10.avif";
import image11 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_11.avif";
import image12 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_12.avif";
import image13 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_13.avif";
import image14 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_14.avif";
import image15 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_15.avif";
import image16 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_16.avif";
import image17 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_17.avif";
import image18 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_18.avif";
import image19 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_19.avif";
import image20 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_20.avif";

// 📌 Image Groups
const delhiImages = [image01, image02, image03, image04, image05];
const noidaImages = [image06, image07, image08, image09, image10];
const gurgaonImages = [image11, image12, image13, image14, image15];
const faridabadImages = [image16, image17, image18];
const mumbaiImages = [image19, image20, image01, image02];
const dubaiImages = [image03, image04, image05, image06, image07];

// 📌 Mock Data
const mockData = {
  "new-delhi-ncr": [
    {
      id: 1,
      name: "DLF Sky Tower",
      bhk: "3 BHK Apartment",
      price: "₹2 Cr",
      location: "Connaught Place, Delhi NCR",
      possession: "Ready to Move",
      postedBy: "Owner",
      postedTime: "Today",
      ownerName: "Mohit Verma",
      images: delhiImages.length,
      image: delhiImages,
    },
    {
      id: 2,
      name: "Gaur City Villa",
      bhk: "2 BHK Villa",
      price: "₹75 Lakh",
      location: "Rohini, Delhi NCR",
      possession: "Under Construction",
      postedBy: "Broker",
      postedTime: "Yesterday",
      ownerName: "Amit Singh",
      images: delhiImages.length,
      image: delhiImages,
    },
  ],

  noida: [
    {
      id: 3,
      name: "ATS Greens",
      bhk: "2 BHK Apartment",
      price: "₹1.2 Cr",
      location: "Noida Sector 62",
      possession: "Ready to Move",
      postedBy: "Owner",
      postedTime: "2 days ago",
      ownerName: "Rohit Sharma",
      images: noidaImages.length,
      image: noidaImages,
    },
    {
      id: 4,
      name: "Supertech Eco",
      bhk: "1 BHK Studio",
      price: "₹65 Lakh",
      location: "Noida Sector 45",
      possession: "Under Construction",
      postedBy: "Broker",
      postedTime: "Yesterday",
      ownerName: "Neha Gupta",
      images: noidaImages.length,
      image: noidaImages,
    },
  ],

  gurgaon: [
    {
      id: 5,
      name: "M3M Golf Estate",
      bhk: "4 BHK Penthouse",
      price: "₹3 Cr",
      location: "Golf Course Road, Gurgaon",
      possession: "Ready to Move",
      postedBy: "Channel Partner",
      postedTime: "Today",
      ownerName: "Arjun Mehta",
      images: gurgaonImages.length,
      image: gurgaonImages,
    },
    {
      id: 6,
      name: "DLF Magnolias",
      bhk: "5 BHK Villa",
      price: "₹5 Cr",
      location: "DLF Phase 5, Gurgaon",
      possession: "Under Construction",
      postedBy: "Owner",
      postedTime: "Yesterday",
      ownerName: "Karan Kapoor",
      images: gurgaonImages.length,
      image: gurgaonImages,
    },
  ],

  faridabad: [
    {
      id: 7,
      name: "Omaxe Heights",
      bhk: "3 BHK Apartment",
      price: "₹85 Lakh",
      location: "Faridabad Sector 21",
      possession: "Upcoming",
      postedBy: "Broker",
      postedTime: "3 days ago",
      ownerName: "Simran Kaur",
      images: faridabadImages.length,
      image: faridabadImages,
    },
    {
      id: 8,
      name: "BPTP Parklands",
      bhk: "2 BHK Apartment",
      price: "₹60 Lakh",
      location: "Ballabgarh, Faridabad",
      possession: "Ready to Move",
      postedBy: "Owner",
      postedTime: "Today",
      ownerName: "Rajesh Yadav",
      images: faridabadImages.length,
      image: faridabadImages,
    },
  ],

  mumbai: [
    {
      id: 9,
      name: "Oberoi Exquisite",
      bhk: "2 BHK Apartment",
      price: "₹1.5 Cr",
      location: "Bandra West, Mumbai",
      possession: "Ready to Move",
      postedBy: "Broker",
      postedTime: "Yesterday",
      ownerName: "Neha Gupta",
      images: mumbaiImages.length,
      image: mumbaiImages,
    },
    {
      id: 10,
      name: "Lodha World Crest",
      bhk: "4 BHK Penthouse",
      price: "₹6 Cr",
      location: "Worli, Mumbai",
      possession: "Under Construction",
      postedBy: "Owner",
      postedTime: "2 days ago",
      ownerName: "Arjun Mehta",
      images: mumbaiImages.length,
      image: mumbaiImages,
    },
  ],

  dubai: [
    {
      id: 11,
      name: "Burj Vista",
      bhk: "3 BHK Apartment",
      price: "AED 2.5M",
      location: "Downtown Dubai",
      possession: "Ready to Move",
      postedBy: "Channel Partner",
      postedTime: "Today",
      ownerName: "Mohit Verma",
      images: dubaiImages.length,
      image: dubaiImages,
    },
    {
      id: 12,
      name: "Atlantis Residence",
      bhk: "5 BHK Villa",
      price: "AED 7M",
      location: "Palm Jumeirah, Dubai",
      possession: "Under Construction",
      postedBy: "Owner",
      postedTime: "Yesterday",
      ownerName: "Amit Singh",
      images: dubaiImages.length,
      image: dubaiImages,
    },
  ],
};

export default mockData;
