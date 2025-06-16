export interface AvatarOptions {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "solid" | "outline" | "subtle";
}

export class Avatar {
  private element: HTMLElement;
  private img: HTMLImageElement | null = null;
  private initialsElement: HTMLElement | null = null;
  private options: AvatarOptions;

  constructor(element: HTMLElement, options: AvatarOptions = {}) {
    this.element = element;
    this.options = options;
    this.init();
  }

  private init(): void {
    this.setupClasses();

    if (this.options.src) {
      this.loadImage();
    } else if (this.options.initials) {
      this.showInitials();
    }
  }

  private setupClasses(): void {
    this.element.classList.add("avatar");

    if (this.options.size && this.options.size !== "md") {
      this.element.classList.add(`avatar-${this.options.size}`);
    }

    if (this.options.variant && this.options.variant !== "default") {
      this.element.classList.add(`avatar-${this.options.variant}`);
    }
  }

  private loadImage(): void {
    if (!this.options.src) return;

    // Show initials while loading if available
    if (this.options.initials) {
      this.showInitials();
    }

    this.img = document.createElement("img");
    this.img.src = this.options.src;
    this.img.alt = this.options.alt || "";
    this.img.style.display = "none"; // Hide until loaded

    this.img.onload = () => {
      this.hideInitials();
      if (this.img) {
        this.img.style.display = "block";
        this.element.appendChild(this.img);
      }
    };

    this.img.onerror = () => {
      // Image failed to load, show initials
      if (this.options.initials) {
        this.showInitials();
      }
    };
  }

  private showInitials(): void {
    if (!this.options.initials) return;

    this.hideInitials(); // Remove existing initials element

    this.initialsElement = document.createElement("span");
    this.initialsElement.className = "avatar-initials";
    this.initialsElement.textContent = this.options.initials;
    this.element.appendChild(this.initialsElement);
  }

  private hideInitials(): void {
    if (this.initialsElement) {
      this.initialsElement.remove();
      this.initialsElement = null;
    }
  }

  // Public methods to update the avatar
  public updateImage(src: string, alt?: string): void {
    this.options.src = src;
    this.options.alt = alt || this.options.alt;

    // Remove existing image
    if (this.img) {
      this.img.remove();
      this.img = null;
    }

    this.loadImage();
  }

  public updateInitials(initials: string): void {
    this.options.initials = initials;
    if (this.initialsElement) {
      this.initialsElement.textContent = initials;
    } else if (!this.img || this.img.style.display === "none") {
      this.showInitials();
    }
  }

  public updateVariant(variant: AvatarOptions["variant"]): void {
    // Remove existing variant classes
    this.element.classList.remove(
      "avatar-solid",
      "avatar-outline",
      "avatar-subtle",
    );

    this.options.variant = variant;
    if (variant && variant !== "default") {
      this.element.classList.add(`avatar-${variant}`);
    }
  }
}

// Auto-initialize avatars with data attributes
document.addEventListener("DOMContentLoaded", () => {
  const avatars = document.querySelectorAll("[data-avatar]");

  avatars.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const options: AvatarOptions = {
      src: htmlElement.dataset.avatarSrc,
      alt: htmlElement.dataset.avatarAlt,
      initials: htmlElement.dataset.avatarInitials,
      size: htmlElement.dataset.avatarSize as AvatarOptions["size"],
      variant: htmlElement.dataset.avatarVariant as AvatarOptions["variant"],
    };

    new Avatar(htmlElement, options);
  });
});

// Export for manual initialization
export default Avatar;
