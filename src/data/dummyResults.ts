import { SearchResult } from '../store/searchSlice';

export const DUMMY_RESULTS: SearchResult[] = [
  {
    id: 1,
    title: 'Random Michal Folder',
    description: 'in Photos/Assets',
    tag: '12 files',
    lastUpdated: 'Edited 12m ago',
    type: 'folder',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/folder/1',
  },
  {
    id: 2,
    title: 'Random Image File',
    description: 'in Photos/Assets',
    tag: 'PNG',
    lastUpdated: 'Edited 5m ago',
    type: 'file',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/file/2',
  },
  {
    id: 3,
    title: 'Randall Pearson',
    description: 'Design Lead',
    tag: 'Active now',
    lastUpdated: 'Updated 2m ago',
    type: 'person',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/user/3',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: 4,
    title: 'Random Team Chat',
    description: 'Quarterly planning thread',
    tag: '12 replies',
    lastUpdated: 'Active 1h ago',
    type: 'chat',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/chat/4',
  },
  {
    id: 5,
    title: 'To-Do List: Rand migration',
    description: 'Infra tasks and checkpoints',
    tag: '7 items',
    lastUpdated: 'Edited yesterday',
    type: 'list',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/list/5',
  },
  {
    id: 6,
    title: 'Project Documents',
    description: 'in Work/Projects',
    tag: '8 files',
    lastUpdated: 'Edited 1h ago',
    type: 'folder',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/folder/6',
  },
  {
    id: 7,
    title: 'Sarah Johnson',
    description: 'Product Manager',
    tag: 'Online',
    lastUpdated: 'Active 5m ago',
    type: 'person',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/user/7',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: 8,
    title: 'Design System Guide',
    description: 'in Design/Resources',
    tag: 'PDF',
    lastUpdated: 'Edited 3h ago',
    type: 'file',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/file/8',
  },
  {
    id: 9,
    title: 'Marketing Campaign Chat',
    description: 'Q4 campaign discussion',
    tag: '24 replies',
    lastUpdated: 'Active 30m ago',
    type: 'chat',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/chat/9',
  },
  {
    id: 10,
    title: 'Mike Chen',
    description: 'Frontend Developer',
    tag: 'Away',
    lastUpdated: 'Last seen 2h ago',
    type: 'person',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/user/10',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: 11,
    title: 'Bug Reports List',
    description: 'Critical issues to fix',
    tag: '15 items',
    lastUpdated: 'Edited 4h ago',
    type: 'list',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/list/11',
  },
  {
    id: 12,
    title: 'User Research Data',
    description: 'in Research/Interviews',
    tag: 'CSV',
    lastUpdated: 'Edited yesterday',
    type: 'file',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/file/12',
  },
  {
    id: 13,
    title: 'Emma Wilson',
    description: 'UX Designer',
    tag: 'Active now',
    lastUpdated: 'Updated 1m ago',
    type: 'person',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/user/13',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: 14,
    title: 'Code Review Chat',
    description: 'PR #1234 discussion',
    tag: '8 replies',
    lastUpdated: 'Active 15m ago',
    type: 'chat',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/chat/14',
  },
  {
    id: 15,
    title: 'Sprint Planning List',
    description: 'Next sprint tasks',
    tag: '22 items',
    lastUpdated: 'Edited 6h ago',
    type: 'list',
    // @ts-expect-error allow url loose presence
    url: 'https://example.com/list/15',
  },
];


