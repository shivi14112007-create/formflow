import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

import {
  FormField,
  FormTemplate,
  FormAnalytics
} from '../../types';

import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Radio } from '../ui/Radio';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';
import { Modal } from '../ui/Modal';

import {
  Plus,
  Trash2,
  Settings2,
  Play,
  Eye,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  TrendingUp,
  Clock,
  Activity,
  Award,
  BookOpen,
  HelpCircle,
  Database,
  ArrowRight,
  Sparkles,
  RefreshCw,
  PlusCircle,
  Download,
  ChevronDown,
  Copy,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Layers,
  FolderOpen,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface InteractiveBuilderWorkspaceProps {
  activeTab: string;
  onTabChange?: (tabId: string) => void;
}

export const InteractiveBuilderWorkspace: React.FC<
  InteractiveBuilderWorkspaceProps
> = ({
  activeTab,
  onTabChange
}) => {
  const [formTitle, setFormTitle] = React.useState(
    'Customer Feedback Form'
  );

  const [formDescription, setFormDescription] = React.useState(
    'Help us improve FormFlow with your instant serverless feedback.'
  );

  const [toast, setToast] = React.useState<{
    message: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  const showToast = (
    message: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    setToast({ message, type });
  };

  React.useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  const [fields, setFields] = React.useState<FormField[]>([
    {
      id: 'field-1',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your first and last name',
      required: true
    },
    {
      id: 'field-2',
      type: 'email',
      label: 'Work Email Address',
      placeholder: 'name@company.com',
      required: true
    },
    {
      id: 'field-3',
      type: 'select',
      label: 'How did you hear about FormFlow?',
      required: false,
      options: [
        'Product Hunt',
        'AWS re:Invent',
        'Twitter/X',
        'Colleague referral'
      ]
    },
    {
      id: 'field-4',
      type: 'textarea',
      label: 'What feature would you like to see next?',
      placeholder:
        'Tell us your thoughts or AWS lambda ideas...',
      required: false
    }
  ]);

  const [selectedFieldId, setSelectedFieldId] =
    React.useState<string | null>('field-1');

  const [isDraggingOverCanvas, setIsDraggingOverCanvas] =
    React.useState(false);

  const [draggedIndex, setDraggedIndex] =
    React.useState<number | null>(null);

  const [dragOverIndex, setDragOverIndex] =
    React.useState<number | null>(null);
      const handleMoveField = (
    index: number,
    direction: 'up' | 'down'
  ) => {
    const targetIndex =
      direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < fields.length) {
      const newFields = [...fields];

      const temp = newFields[index];
      newFields[index] = newFields[targetIndex];
      newFields[targetIndex] = temp;

      setFields(newFields);

      showToast(`Moved field ${direction}!`, 'info');
    }
  };

  const handleClearWorkspace = () => {
    if (fields.length === 0) {
      showToast('Workspace is already empty!', 'info');
      return;
    }

    setFields([]);
    setSelectedFieldId(null);

    showToast(
      'Workspace canvas cleared successfully!',
      'success'
    );
  };

  const handleDropField = (targetIdx: number) => {
    if (
      draggedIndex === null ||
      draggedIndex === targetIdx
    )
      return;

    const nextFields = [...fields];

    const [removed] = nextFields.splice(
      draggedIndex,
      1
    );

    nextFields.splice(targetIdx, 0, removed);

    setFields(nextFields);

    setDraggedIndex(null);
    setDragOverIndex(null);

    showToast(
      'Field reordered successfully via integrated drag handle!',
      'success'
    );
  };

  const handleLoadSampleTemplate = () => {
    const sampleFields: FormField[] = [
      {
        id: 'field-1',
        label: 'Full Name',
        type: 'text',
        required: true,
        placeholder:
          'Enter your first and last name'
      },
      {
        id: 'field-2',
        label: 'Work Email Address',
        type: 'email',
        required: true,
        placeholder: 'name@company.com'
      },
      {
        id: 'field-3',
        label: 'Self Assessment',
        type: 'select',
        required: false,
        options: [
          'Junior Architect',
          'Staff Lead',
          'Principal DevOps',
          'Independent Advisor'
        ]
      }
    ];

    setFields(sampleFields);
    setSelectedFieldId('field-1');

    setFormTitle(
      'Product Survey & Assessment'
    );

    setFormDescription(
      'Configure your serverless product research data points in under 60 seconds.'
    );

    showToast(
      'Loaded high-convert product survey template!',
      'success'
    );
  };

  const [isPreviewModalOpen, setIsPreviewModalOpen] =
    React.useState(false);

  const [
    isSchemaExportModalOpen,
    setIsSchemaExportModalOpen
  ] = React.useState(false);

  const [
    previewFormValues,
    setPreviewFormValues
  ] = React.useState<Record<string, any>>({});

  const [
    previewErrors,
    setPreviewErrors
  ] = React.useState<Record<string, string>>({});

  const [
    previewTheme,
    setPreviewTheme
  ] = React.useState<
    'indigo' | 'emerald' | 'amber' | 'rose' | 'slate'
  >('indigo');

  const [
    previewBreakpoint,
    setPreviewBreakpoint
  ] = React.useState<
    'mobile' | 'tablet' | 'desktop'
  >('desktop');

  const handleOpenPreview = () => {
    const initialVals: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.type === 'checkbox') {
        initialVals[field.id] = {};
      } else {
        initialVals[field.id] = '';
      }
    });

    setPreviewFormValues(initialVals);
    setPreviewErrors({});
    setIsPreviewModalOpen(true);
  };

  const [
    formSubmissionSuccessMessage,
    setFormSubmissionSuccessMessage
  ] = React.useState<string | null>(null);

  const [totalSubmissions, setTotalSubmissions] =
    React.useState(42);

  const [totalViews, setTotalViews] =
    React.useState(118);

  const [
    expandedEntryId,
    setExpandedEntryId
  ] = React.useState<string | null>(null);
    const [recentEntries, setRecentEntries] = React.useState<
    Array<{
      id: string;
      email: string;
      browser: string;
      time: string;
      submittedData?: Record<string, string>;
    }>
  >([
    {
      id: 'Ingest-742910',
      email: 'justin@vercel.com',
      browser: 'Chrome',
      time: '2 mins ago',
      submittedData: {
        'Full Name': 'Justin',
        'Work Email Address': 'justin@vercel.com',
        'How did you hear about FormFlow?': 'Product Hunt'
      }
    },
    {
      id: 'Ingest-391820',
      email: 'aws-ops@amazon.co.uk',
      browser: 'Firefox',
      time: '12 mins ago',
      submittedData: {
        'Company Legal Name': 'Amazon UK Ops',
        'Number of Seats': '250',
        'Cloud Hosting Preference': 'AWS Us-East-1'
      }
    },
    {
      id: 'Ingest-821035',
      email: 'framer-dev@framer.de',
      browser: 'Safari',
      time: '1 hr ago',
      submittedData: {
        'Full Name': 'Framer Dev',
        'Work Email Address': 'framer-dev@framer.de'
      }
    },
    {
      id: 'Ingest-140284',
      email: 'shivi14112007@gmail.com',
      browser: 'Edge',
      time: '3 hrs ago',
      submittedData: {
        'Full Name': 'Shivi',
        'Work Email Address': 'shivi14112007@gmail.com'
      }
    }
  ]);

  const handleAddField = (type: FormField['type']) => {
    const newId = `field-${Date.now()}`;

    const defaultLabels: Record<FormField['type'], string> = {
      text: 'Short Answer Input',
      textarea: 'Long Answer Textarea',
      select: 'Dropdown Selection',
      checkbox: 'Choose Options Checkbox',
      radio: 'Single Option Select',
      email: 'Corporate Email Address',
      number: 'Measurement or Count'
    };

    const newField: FormField = {
      id: newId,
      type,
      label: defaultLabels[type],
      required: false,
      placeholder:
        type === 'text'
          ? 'Write your response...'
          : type === 'email'
          ? 'you@example.com'
          : undefined,
      options: ['select', 'checkbox', 'radio'].includes(type)
        ? ['Option 1', 'Option 2', 'Option 3']
        : undefined
    };

    setFields([...fields, newField]);
    setSelectedFieldId(newId);
  };

  const updateFieldProperty = (
    fieldId: string,
    property: keyof FormField,
    value: any
  ) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? { ...field, [property]: value }
          : field
      )
    );
  };

  const handleDeleteField = (fieldId: string) => {
    const updated = fields.filter(
      (field) => field.id !== fieldId
    );

    setFields(updated);

    if (selectedFieldId === fieldId) {
      setSelectedFieldId(
        updated.length ? updated[0].id : null
      );
    }
  };

  const templates: FormTemplate[] = [
    {
      id: 'template-1',
      title: 'SaaS Customer Onboarding',
      description:
        'Collect details from high-tier enterprise clients with automated webhook integrations.',
      createdAt: '2026-06-15',
      submissionsCount: 140,
      status: 'active',
      fields: [
        {
          id: 'on-1',
          type: 'text',
          label: 'Company Legal Name',
          required: true
        },
        {
          id: 'on-2',
          type: 'number',
          label: 'Number of Seats',
          required: true
        },
        {
          id: 'on-3',
          type: 'select',
          label: 'Cloud Hosting Preference',
          required: true,
          options: [
            'AWS Us-East-1',
            'GCP Iowa',
            'SaaS Multi-tenant'
          ]
        }
      ]
    },
        {
      id: 'template-2',
      title: 'Lambda Endpoint Bug Report',
      description:
        'Streamline developer crash reporting with trace log dumps directly on Amazon S3.',
      createdAt: '2026-06-19',
      submissionsCount: 8,
      status: 'active',
      fields: [
        {
          id: 'bug-1',
          type: 'text',
          label: 'AWS Lambda Request ID',
          required: true
        },
        {
          id: 'bug-2',
          type: 'select',
          label: 'HTTP Failure Status Code',
          required: true,
          options: [
            '500 Internal Error',
            '502 Bad Gateway',
            '403 Forbidden'
          ]
        },
        {
          id: 'bug-3',
          type: 'textarea',
          label: 'JSON Stacktrace Dump',
          required: true,
          placeholder: 'Paste string trace log...'
        }
      ]
    },
    {
      id: 'template-3',
      title: 'Event RSVP & Ticket Registration',
      description:
        'Collect attendance records for technical webinars or AWS community conferences.',
      createdAt: '2026-06-21',
      submissionsCount: 201,
      status: 'draft',
      fields: [
        {
          id: 'rsvp-1',
          type: 'text',
          label: 'Preferred Nickname',
          required: true
        },
        {
          id: 'rsvp-2',
          type: 'radio',
          label: 'Will you attend in-person?',
          required: true,
          options: [
            'Yes, count me in!',
            'No, online broadcast only',
            'Undecided'
          ]
        }
      ]
    }
  ];

  const handleLoadTemplate = (
    template: FormTemplate
  ) => {
    setFormTitle(template.title);
    setFormDescription(template.description);
    setFields(template.fields);

    if (template.fields.length > 0) {
      setSelectedFieldId(template.fields[0].id);
    }

    showToast(`Loaded Template: "${template.title}".`);

    if (onTabChange) {
      onTabChange('builder');
    }
  };

  const handleLiveFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    fields.forEach((field) => {
      if (!field.required) return;

      if (field.type === 'checkbox') {
        const selected =
          previewFormValues[field.id] || {};

        const checked = Object.values(selected).some(
          (v) => v === true
        );

        if (!checked) {
          errors[field.id] =
            'Please select at least one option';
        }
      } else {
        const value = previewFormValues[field.id];

        if (
          value === undefined ||
          value === null ||
          String(value).trim() === ''
        ) {
          errors[field.id] =
            `${field.label} is required`;
        }
      }
    });
        fields.forEach((field) => {
      if (field.type === 'email') {
        const email = previewFormValues[field.id];

        if (
          email &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
          errors[field.id] =
            'Please enter a valid email address';
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setPreviewErrors(errors);

      showToast(
        'Validation failed. Please correct the highlighted fields.',
        'error'
      );

      return;
    }

    const data = new FormData(e.currentTarget);

    const submittedData: Record<string, string> = {};

    let fallbackEmail = '';

    fields.forEach((field) => {
      if (field.type === 'checkbox') {
        const checked: string[] = [];

        field.options?.forEach((option, index) => {
          if (data.get(`${field.id}-${index}`)) {
            checked.push(option);
          }
        });

        submittedData[field.label] =
          checked.length > 0
            ? checked.join(', ')
            : 'None selected';
      } else {
        const value =
          (data.get(field.id) as string) || '';

        submittedData[field.label] =
          value || 'Not provided';

        if (field.type === 'email' && value) {
          fallbackEmail = value;
        }
      }
    });

    if (!fallbackEmail) {
      const firstValue =
        (data.get(fields[0]?.id || '') as string) ||
        '';

      fallbackEmail = firstValue
        ? `${firstValue
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')}@gmail.com`
        : 'anonymous@formflow.io';
    }

    setTotalSubmissions((prev) => prev + 1);
    setTotalViews((prev) => prev + 1);

    const newEntry = {
      id: `Ingest-${Math.floor(
        100000 + Math.random() * 900000
      )}`,
      email: fallbackEmail,
      browser:
        ['Chrome', 'Firefox', 'Safari', 'Edge'][
          Math.floor(Math.random() * 4)
        ],
      time: 'Just now',
      submittedData
    };

    setRecentEntries((prev) => [
      newEntry,
      ...prev
    ]);

    showToast(
      'Ingested new response!',
      'success'
    );

    setFormSubmissionSuccessMessage(
      'Form response recorded successfully!'
    );

    setTimeout(() => {
      setIsPreviewModalOpen(false);
      setFormSubmissionSuccessMessage(null);

      onTabChange?.('analytics');
    }, 4500);
  };

  const conversionRate =
    Math.round(
      (totalSubmissions / totalViews) * 100
    ) || 35;

  const submissionsTimeData = [
    { date: 'Jun 16', count: 12 },
    { date: 'Jun 17', count: 18 },
    { date: 'Jun 18', count: 15 },
    { date: 'Jun 19', count: 24 },
    { date: 'Jun 20', count: totalSubmissions - 5 },
    { date: 'Jun 21', count: totalSubmissions - 2 },
    { date: 'Jun 22', count: totalSubmissions }
  ];

  const browserData = [
    { name: 'Chrome', value: 45, color: '#6366F1' },
    { name: 'Safari', value: 25, color: '#8B5CF6' },
    { name: 'Firefox', value: 18, color: '#EC4899' },
    { name: 'Edge', value: 12, color: '#10B981' }
  ];

  return (    <div className="w-full h-full p-6 space-y-6">

      {activeTab === 'builder' && (
        <div className="grid grid-cols-12 gap-6">

          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="p-5 space-y-4">

              <h3 className="font-semibold text-lg">
                Field Elements
              </h3>

              <p className="text-sm text-zinc-500">
                Click any element to add it into the form.
              </p>

              {[
                ['text', 'Text'],
                ['email', 'Email'],
                ['textarea', 'Textarea'],
                ['number', 'Number'],
                ['select', 'Dropdown'],
                ['checkbox', 'Checkbox'],
                ['radio', 'Radio']
              ].map(([type, label]) => (
                <Button
                  key={type}
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() =>
                    handleAddField(type as FormField['type'])
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {label}
                </Button>
              ))}

              <Button
                variant="primary"
                className="w-full"
                onClick={handleLoadSampleTemplate}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Load Sample
              </Button>

            </Card>
          </div>

          {/* Builder */}
          <div className="col-span-12 lg:col-span-6">

            <Card className="p-6 space-y-5">

              <Input
                value={formTitle}
                onChange={(e) =>
                  setFormTitle(e.target.value)
                }
                placeholder="Form Title"
              />

              <Textarea
                value={formDescription}
                onChange={(e) =>
                  setFormDescription(e.target.value)
                }
                placeholder="Form Description"
              />

              <div className="space-y-3">                {fields.map((field, index) => (
                  <Card
                    key={field.id}
                    className={cn(
                      "p-4 cursor-pointer transition-all",
                      selectedFieldId === field.id
                        ? "border-indigo-500"
                        : ""
                    )}
                    onClick={() =>
                      setSelectedFieldId(field.id)
                    }
                  >
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <GripVertical className="h-4 w-4 text-zinc-500" />

                        <div>
                          <p className="font-medium">
                            {field.label}
                          </p>

                          <Badge>
                            {field.type}
                          </Badge>
                        </div>

                      </div>

                      <div className="flex gap-2">

                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={index === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveField(index, 'up');
                          }}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={
                            index === fields.length - 1
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveField(index, 'down');
                          }}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteField(field.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                      </div>

                    </div>
                  </Card>
                ))}

              </div>

              <div className="flex gap-3 pt-4">

                <Button
                  variant="secondary"
                  onClick={() =>
                    setIsSchemaExportModalOpen(true)
                  }
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export JSON
                </Button>

                <Button
                  variant="primary"
                  onClick={handleOpenPreview}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Form
                </Button>

              </div>

            </Card>

          </div>          {/* Right Configuration Panel */}
          <div className="col-span-12 lg:col-span-3">

            <Card className="p-5 space-y-4">

              <h3 className="text-lg font-semibold">
                Field Settings
              </h3>

              {selectedFieldId ? (
                (() => {
                  const field = fields.find(
                    (f) => f.id === selectedFieldId
                  );

                  if (!field) return null;

                  return (
                    <div className="space-y-4">

                      <Input
                        value={field.label}
                        placeholder="Field Label"
                        onChange={(e) =>
                          updateFieldProperty(
                            field.id,
                            'label',
                            e.target.value
                          )
                        }
                      />

                      {(field.type === 'text' ||
                        field.type === 'email' ||
                        field.type === 'textarea' ||
                        field.type === 'number') && (
                        <Input
                          value={field.placeholder || ''}
                          placeholder="Placeholder"
                          onChange={(e) =>
                            updateFieldProperty(
                              field.id,
                              'placeholder',
                              e.target.value
                            )
                          }
                        />
                      )}

                      {(field.type === 'select' ||
                        field.type === 'checkbox' ||
                        field.type === 'radio') && (
                        <Textarea
                          value={
                            field.options?.join('\n') || ''
                          }
                          placeholder="One option per line"
                          onChange={(e) =>
                            updateFieldProperty(
                              field.id,
                              'options',
                              e.target.value
                                .split('\n')
                                .filter(Boolean)
                            )
                          }
                        />
                      )}

                      <Checkbox
                        checked={field.required}
                        onCheckedChange={(checked) =>
                          updateFieldProperty(
                            field.id,
                            'required',
                            checked
                          )
                        }
                        label="Required Field"
                      />

                    </div>
                  );
                })()
              ) : (
                <p className="text-sm text-zinc-500">
                  Select a field to edit its properties.
                </p>
              )}

            </Card>

          </div>

        </div>
      )}      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Live Form Preview"
        size="lg"
      >
        <form
          className="space-y-4"
          onSubmit={handleLiveFormSubmit}
        >
          <h2 className="text-xl font-bold">
            {formTitle}
          </h2>

          <p className="text-sm text-zinc-500">
            {formDescription}
          </p>

          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="text-sm font-medium">
                {field.label}
                {field.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              {field.type === 'text' && (
                <Input
                  name={field.id}
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'email' && (
                <Input
                  name={field.id}
                  type="email"
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'number' && (
                <Input
                  name={field.id}
                  type="number"
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'textarea' && (
                <Textarea
                  name={field.id}
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'select' && (
                <Select name={field.id}>
                  {(field.options || []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsPreviewModalOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isSchemaExportModalOpen}
        onClose={() =>
          setIsSchemaExportModalOpen(false)
        }
        title="JSON Schema"
      >
        <pre className="overflow-auto rounded-lg bg-zinc-950 p-4 text-xs">
          {JSON.stringify(
            {
              title: formTitle,
              description: formDescription,
              fields
            },
            null,
            2
          )}
        </pre>
      </Modal>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 rounded-xl bg-zinc-900 px-4 py-3 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};