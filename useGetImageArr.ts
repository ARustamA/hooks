export function getThumbnailsArr(pictures: { [key: string]: string }) {
   const arr = [];

   for (const key in pictures) {
     if (key.startsWith('thumbnail_') && pictures[key] !== null) {
       arr.push({ link: pictures[key] });
     }
   }
 
   return arr.length > 0 ? arr : null;
 }
 



