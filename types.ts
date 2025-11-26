import React from 'react';

export enum ModuleId {
  HOME = 'home',
  LEARNING_PATH = 'learning_path',
  INTRO = 'intro',
  IDENTITY = 'identity',
  INFRASTRUCTURE = 'infrastructure',
  DATA_PROTECTION = 'data_protection',
  DETECTION = 'detection',
  AUTOMATION = 'automation',
  ADVANCED = 'advanced',
  ARCHITECTURE = 'architecture',
  ROADMAP = 'roadmap',
  ALL_SERVICES = 'all_services'
}

export interface NavItem {
  id: ModuleId;
  title: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum SecurityLayer {
  INFRASTRUCTURE = 'Infrastructure',
  COMPUTE = 'Compute',
  APP = 'Application',
  DATA = 'Data'
}

export interface LearningPathNode {
  id: ModuleId;
  title: string;
  subtitle: string;
  desc: string;
  time: string;
  xp: number;
  status: 'locked' | 'unlocked' | 'completed';
  icon: React.ReactNode;
}