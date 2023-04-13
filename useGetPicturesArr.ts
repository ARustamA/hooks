import { getThumbnailsArr } from "./useGetImageArr";
import bidImg from '../assets/images/orderLine.png';
import { IAds } from "@/common/types/ads.type";


export const useGetPicturesArr = (bid: IAds) => {
   const pictures: { [key: string]: string } = bid.pictures ? bid.pictures : { thumbnail_1: bidImg };
   const arrImageAd = getThumbnailsArr(pictures);

   const picturesLoad: { [key: string]: string } | null = bid?.load ? bid?.load.pictures : null;

   const picturesAuto: { [key: string]: string } | null = bid?.auto ? bid?.auto.pictures : null;
   const arrImageLoad = picturesLoad ? getThumbnailsArr(picturesLoad) : null;
   const arrImageAuto = picturesAuto ? getThumbnailsArr(picturesAuto) : null;

   let allPictures: { [key: string]: string }[] | null = null

   if (arrImageAd) {
      if (bid.type === 'load_ad') {
         if (arrImageLoad) {
            return allPictures = arrImageAd.concat(arrImageLoad);
         } else {
            return allPictures = arrImageAd;
         }
      } else {
         if (arrImageAuto) {
            return allPictures = arrImageAd.concat(arrImageAuto);
         } else {
            return allPictures = arrImageAd;
         }
      }
   } else {
      return allPictures;
   }
}