import gsap from 'gsap';

export interface RegisteredTimeline {
  id: string;
  timeline: gsap.core.Timeline;
  chapterIndex?: number;
  description?: string;
}

class TimelineManager {
  private timelines: Map<string, RegisteredTimeline> = new Map();
  private globalSpeed: number = 1;
  private isPaused: boolean = false;

  /**
   * Register a GSAP timeline in the central manager
   */
  public register(id: string, timeline: gsap.core.Timeline, chapterIndex?: number, description?: string): void {
    this.timelines.set(id, { id, timeline, chapterIndex, description });
    timeline.timeScale(this.globalSpeed);
  }

  /**
   * Unregister a timeline
   */
  public unregister(id: string): void {
    const item = this.timelines.get(id);
    if (item) {
      item.timeline.kill();
      this.timelines.delete(id);
    }
  }

  /**
   * Get a registered timeline by ID
   */
  public get(id: string): gsap.core.Timeline | undefined {
    return this.timelines.get(id)?.timeline;
  }

  /**
   * Play all timelines or a specific chapter timeline
   */
  public play(idOrChapter?: string | number): void {
    if (typeof idOrChapter === 'string') {
      this.timelines.get(idOrChapter)?.timeline.play();
    } else if (typeof idOrChapter === 'number') {
      this.timelines.forEach((item) => {
        if (item.chapterIndex === idOrChapter) {
          item.timeline.play();
        }
      });
    } else {
      this.isPaused = false;
      this.timelines.forEach((item) => item.timeline.play());
    }
  }

  /**
   * Pause all timelines or a specific timeline
   */
  public pause(id?: string): void {
    if (id) {
      this.timelines.get(id)?.timeline.pause();
    } else {
      this.isPaused = true;
      this.timelines.forEach((item) => item.timeline.pause());
    }
  }

  /**
   * Reverse all or a specific timeline
   */
  public reverse(id?: string): void {
    if (id) {
      this.timelines.get(id)?.timeline.reverse();
    } else {
      this.timelines.forEach((item) => item.timeline.reverse());
    }
  }

  /**
   * Set global speed multiplier for all registered animation timelines
   */
  public setGlobalSpeed(speed: number): void {
    this.globalSpeed = speed;
    this.timelines.forEach((item) => item.timeline.timeScale(speed));
  }

  /**
   * Seek a specific timeline to progress (0 - 1)
   */
  public seek(id: string, progress: number): void {
    const item = this.timelines.get(id);
    if (item) {
      item.timeline.progress(progress);
    }
  }

  /**
   * Clean up all timelines
   */
  public clearAll(): void {
    this.timelines.forEach((item) => item.timeline.kill());
    this.timelines.clear();
  }

  /**
   * Check if global animations are paused
   */
  public getIsPaused(): boolean {
    return this.isPaused;
  }
}

export const timelineManager = new TimelineManager();
