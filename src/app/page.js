


import BannerBlack from "./components/bannerCompany/bannerCompany";

import HomePage from "./Home/Home";
import Cards1 from "./cards1/Cards1";
import Cards2 from "./cards2/Cards2";
import BannerGray from "./bannerGray/bannerGray";
import Review from "./reviews/review";
export default function Home() {
  return (
    <div>
      <HomePage/> 
      <BannerBlack/>
      <Cards1/>
      <Cards2/>
      <BannerGray/>
      <Review/>
    </div>
  );
}
