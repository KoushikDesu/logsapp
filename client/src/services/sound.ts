// Sound service disabled - completely silent operation
class SoundService {
  public toggleSound(): boolean { return false; }
  public isEnabled(): boolean { return false; }
  public playSent() {}
  public playReceived() {}
}

export const sounds = new SoundService();
