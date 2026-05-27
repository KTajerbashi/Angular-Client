import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExtensionsService {
  
  constructor() { }

  /**
   * Generate standard UUID v4
   */
  generateGUID(): string {
    return crypto.randomUUID();
  }

  /**
   * Generate GUID without hyphens
   */
  generateCompactGUID(): string {
    return crypto.randomUUID().replace(/-/g, '');
  }

  /**
   * Generate uppercase GUID
   */
  generateUppercaseGUID(): string {
    return crypto.randomUUID().toUpperCase();
  }

  /**
   * Generate lowercase GUID
   */
  generateLowercaseGUID(): string {
    return crypto.randomUUID().toLowerCase();
  }

  /**
   * Generate GUID with custom prefix/suffix
   */
  generateCustomGUID(prefix?: string, suffix?: string): string {
    let guid = crypto.randomUUID();
    if (prefix) guid = prefix + guid;
    if (suffix) guid = guid + suffix;
    return guid;
  }

  /**
   * Generate GUID in brackets format
   */
  generateBracketedGUID(): string {
    return `{${crypto.randomUUID()}}`;
  }

  /**
   * Generate GUID in parentheses format
   */
  generateParenthesizedGUID(): string {
    return `(${crypto.randomUUID()})`;
  }

  // /**
  //  * Generate multiple GUIDs at once
  //  */
  // generateMultipleGUIDs(count: number, options?: {
  //   compact?: boolean;
  //   uppercase?: boolean;
  //   bracketed?: boolean;
  //   parenthesized?: boolean;
  // }): string[] {
  //   const guids: string[] = [];
  //   for (let i = 0; i < count; i++) {
  //     let guid = crypto.randomUUID();
  //     if (options?.compact) guid = guid.replace(/-/g, '');
  //     if (options?.uppercase) guid = guid.toUpperCase();
  //     if (options?.bracketed) guid = `{${guid}}`;
  //     if (options?.parenthesized) guid = `(${guid})`;
  //     guids.push(guid);
  //   }
  //   return guids;
  // }

  /**
   * Generate time-based GUID (UUID v7 style)
   */
  generateTimestampGUID(): string {
    const timestamp = Date.now().toString(16).padStart(12, '0');
    const random1 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
    const random2 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
    const random3 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
    
    return `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-7${random1.slice(1)}-${random2}-${random3}`;
  }

  /**
   * Generate GUID from any string (deterministic)
   */
  generateGUIDFromString(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    const random = Math.abs(hash).toString(16).padStart(32, '0');
    return `${random.slice(0, 8)}-${random.slice(8, 12)}-4${random.slice(13, 16)}-${random.slice(16, 20)}-${random.slice(20, 32)}`;
  }

  /**
   * Validate if a string is a valid GUID
   */
  isValidGUID(guid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(guid);
  }

  /**
   * Extract GUID from text
   */
  extractGUIDs(text: string): string[] {
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi;
    return text.match(uuidRegex) || [];
  }

  /**
   * Format existing GUID to different style
   */
  formatGUID(guid: string, format: 'compact' | 'uppercase' | 'lowercase' | 'bracketed' | 'parenthesized'): string {
    let formatted = guid;
    
    if (!this.isValidGUID(guid) && !this.isValidGUID(guid.replace(/[{}()]/g, ''))) {
      throw new Error('Invalid GUID format');
    }
    
    // Remove existing brackets/parentheses
    formatted = formatted.replace(/[{}()]/g, '');
    
    switch(format) {
      case 'compact':
        return formatted.replace(/-/g, '');
      case 'uppercase':
        return formatted.toUpperCase();
      case 'lowercase':
        return formatted.toLowerCase();
      case 'bracketed':
        return `{${formatted}}`;
      case 'parenthesized':
        return `(${formatted}`;
      default:
        return formatted;
    }
  }

  /**
   * Generate sequential GUIDs
   */
  generateSequentialGUIDs(count: number, startTime?: Date): string[] {
    const baseTime = startTime?.getTime() || Date.now();
    const guids: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = (baseTime + i).toString(16).padStart(12, '0');
      const random = Math.random().toString(16).substring(2, 10);
      const guid = `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-4${random.slice(0, 3)}-${random.slice(3, 7)}-${random.slice(7, 19)}`;
      guids.push(guid);
    }
    
    return guids;
  }

  // /**
  //  * Batch generate with different formats
  //  */
  // batchGenerate(config: Array<{
  //   compact?: boolean;
  //   uppercase?: boolean;
  //   prefix?: string;
  //   suffix?: string;
  // }>): string[] {
  //   return config.map(opt => {
  //     let guid = crypto.randomUUID();
  //     if (opt.compact) guid = guid.replace(/-/g, '');
  //     if (opt.uppercase) guid = guid.toUpperCase();
  //     if (opt.prefix) guid = opt.prefix + guid;
  //     if (opt.suffix) guid = guid + opt.suffix;
  //     return guid;
  //   });
  // }
}