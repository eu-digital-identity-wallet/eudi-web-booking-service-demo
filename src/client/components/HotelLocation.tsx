import HeartIcon from "./icons/HeartIcon";
import PinIcon from "./icons/PinIcon";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";
import StarIcon from "./icons/StarIcon";
import TagIcon from "./icons/TagIcon";
import ThumbUpIcon from "./icons/ThumbUpIcon";

export default function HotelLocation() {
  return (
    <div className='flex-row  items-center justify-between p-4 border-b border-gray-200'>
      <div className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center'>
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} className='size-4 text-secondary' />
            ))}
          </div>
          <div className='bg-secondary text-background text-sm font-bold px-1.5 py-0.5 rounded-md flex items-center'>
            <ThumbUpIcon />
            <PlusIcon />
          </div>
        </div>
        <div className='flex  items-center space-x-4'>
          <HeartIcon className='pr-2 text-primary ' />
          <ShareIcon className='pr-2 text-primary ' />
          <div className='flex items-center'>
            <TagIcon className='pr-2 text-primary ' />
            <span className='text-primary font-semibold'>We Price Match</span>
          </div>
        </div>
      </div>

      <h1 className='text-2xl font-bold mt-2 text-accent-foreground'>
        Utopia Hotel
      </h1>
      <div className='flex items-center mt-2'>
        <PinIcon className='w-8 h-8 text-primary' />
        <span className='text-foreground font-semibold'>
          25 Boulevard du Souverain, Watermaal-Bosvoorde / Watermael-Boitsfort,
          1170 Brussels, Belgium
        </span>
      </div>
      <span className='text-primary cursor-pointer  font-bold underline mt-1 block'>
        Great location - show map
      </span>
    </div>
  );
}
