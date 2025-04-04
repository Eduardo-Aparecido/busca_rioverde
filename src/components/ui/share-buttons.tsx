import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Copy, 
  Check 
} from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  showFacebook?: boolean;
  showTwitter?: boolean;
  showLinkedin?: boolean;
  showWhatsapp?: boolean;
  showCopyLink?: boolean;
}

export function ShareButtons({ 
  url, 
  title, 
  description = "",
  showFacebook = true,
  showTwitter = true,
  showLinkedin = true,
  showWhatsapp = true,
  showCopyLink = true
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar URL:", err);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {showFacebook && (
        <Button
          variant="outline"
          size="sm"
          className="flex-1 min-w-[120px] bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none"
          onClick={() => handleShare("facebook")}
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>
      )}

      {showTwitter && (
        <Button
          variant="outline"
          size="sm"
          className="flex-1 min-w-[120px] bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-none"
          onClick={() => handleShare("twitter")}
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>
      )}

      {showLinkedin && (
        <Button
          variant="outline"
          size="sm"
          className="flex-1 min-w-[120px] bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white border-none"
          onClick={() => handleShare("linkedin")}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
      )}

      {showWhatsapp && (
        <Button
          variant="outline"
          size="sm"
          className="flex-1 min-w-[120px] bg-[#25D366] hover:bg-[#25D366]/90 text-white border-none"
          onClick={() => handleShare("whatsapp")}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
      )}

      {showCopyLink && (
        <Button
          variant="outline"
          size="sm"
          className="flex-1 min-w-[120px]"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copiar Link
            </>
          )}
        </Button>
      )}
    </div>
  );
} 