import { Story as StoryComponent } from "@/components/Story";
import { Story } from "@/types/story";

interface StoriesContainerProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

export function StoriesContainer({ stories, onStoryClick }: StoriesContainerProps) {
  return (
    <div className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {stories.map((story, index) => (
        <button
          key={story.id}
          onClick={() => onStoryClick(index)}
          className="flex-none"
        >
          <StoryComponent titulo={story.titulo} imagem={story.imagem} />
        </button>
      ))}
    </div>
  );
} 