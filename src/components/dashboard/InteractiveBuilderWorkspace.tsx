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
// For gorgeous charts: 
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
export const InteractiveBuilderWorkspace: React.FC<InteractiveBuilderWorkspaceProps> = ({ 
activeTab, 
onTabChange 
}) => { 
// Master State for our constructed Form 
const [formTitle, setFormTitle] = React.useState('Customer Feedback Form'); 
const [formDescription, setFormDescription] = React.useState(
  `Help us improve FormFlow
with your instant serverless feedback.`
);
// Custom Toast State 
const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'info' | 'error' } | 
null>(null); 
const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => { 
setToast({ message, type }); 
  }; 
 
  React.useEffect(() => { 
    if (toast) { 
      const timer = setTimeout(() => setToast(null), 4000); 
      return () => clearTimeout(timer); 
    } 
  }, [toast]); 
  const [fields, setFields] = React.useState<FormField[]>([ 
    { 
      id: 'field-1', 
      type: 'text', 
      label: 'Full Name', 
      placeholder: 'Enter your first and last name', 
      required: true, 
    }, 
    { 
      id: 'field-2', 
      type: 'email', 
      label: 'Work Email Address', 
      placeholder: 'name@company.com', 
      required: true, 
    }, 
    { 
      id: 'field-3', 
      type: 'select', 
      label: 'How did you hear about FormFlow?', 
      required: false, 
      options: ['Product Hunt', 'AWS re:Invent', 'Twitter/X', 'Colleague referral'], 
    }, 
    { 
      id: 'field-4', 
      type: 'textarea', 
      label: 'What feature would you like to see next?', 
      placeholder: 'Tell us your thoughts or AWS lambda ideas...', 
      required: false, 
    } 
  ]); 
 
  // Tracks is active field in the builder configuration panel 
  const [selectedFieldId, setSelectedFieldId] = React.useState<string | null>('field-1'); 
 
  // HTML5 Drag-and-Drop states 
  const [isDraggingOverCanvas, setIsDraggingOverCanvas] = React.useState(false); 
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null); 
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null); 
 
  // Move field order using Arrow buttons 
  const handleMoveField = (index: number, direction: 'up' | 'down') => { 
    const targetIndex = direction === 'up' ? index - 1 : index + 1; 
    if (targetIndex >= 0 && targetIndex < fields.length) { 
      const newFields = [...fields]; 
      const temp = newFields[index]; 
      newFields[index] = newFields[targetIndex]; 
      newFields[targetIndex] = temp; 
      setFields(newFields); 
      showToast(`Moved field ${direction}!`, 'info'); 
    } 
  }; 
 
  // Clear builder workspace 
  const handleClearWorkspace = () => { 
    if (fields.length === 0) { 
      showToast("Workspace is already empty!", "info"); 
      return; 
    } 
    setFields([]); 
    setSelectedFieldId(null); 
    showToast("Workspace canvas cleared successfully!", "success"); 
  }; 
 
  const handleDropField = (targetIdx: number) => { 
    if (draggedIndex === null || draggedIndex === targetIdx) return; 
    const nextFields = [...fields]; 
    const [removed] = nextFields.splice(draggedIndex, 1); 
    nextFields.splice(targetIdx, 0, removed); 
    setFields(nextFields); 
    setDraggedIndex(null); 
    setDragOverIndex(null); 
    showToast("Field reordered successfully via integrated drag handle!", "success"); 
  }; 
 
  const handleLoadSampleTemplate = () => { 
    const sampleFields = [ 
      { id: 'field-1', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your first 
and last name' }, 
      { id: 'field-2', label: 'Work Email Address', type: 'email', required: true, placeholder: 
'name@company.com' }, 
      { id: 'field-3', label: 'Self Assessment', type: 'select', required: false, options: ['Junior 
Architect', 'Staff Lead', 'Principal DevOps', 'Independent Advisor'] }, 
    ]; 
    setFields(sampleFields); 
    setSelectedFieldId('field-1'); 
    setFormTitle('Product Survey & Assessment'); 
    setFormDescription('Configure your serverless product research data points in under 60 
seconds.'); 
    showToast("Loaded high-convert product survey template!", "success"); 
  }; 
 
  // Preview form test modal and exporting options 
  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false); 
  const [isSchemaExportModalOpen, setIsSchemaExportModalOpen] = React.useState(false); 
  const [previewFormValues, setPreviewFormValues] = React.useState<Record<string, 
any>>({}); 
  const [previewErrors, setPreviewErrors] = React.useState<Record<string, string>>({}); 
  const [previewTheme, setPreviewTheme] = React.useState<'indigo' | 'emerald' | 'amber' | 
'rose' | 'slate'>('indigo'); 
  const [previewBreakpoint, setPreviewBreakpoint] = React.useState<'mobile' | 'tablet' | 
'desktop'>('desktop'); 
 
  const handleOpenPreview = () => { 
    // Reset responses and errors 
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
  const [formSubmissionSuccessMessage, setFormSubmissionSuccessMessage] = 
React.useState<string | null>(null); 
 
  // Live dynamic submissions state that will feed the Analytics 
  const [totalSubmissions, setTotalSubmissions] = React.useState(42); 
  const [totalViews, setTotalViews] = React.useState(118); 
 
  const [expandedEntryId, setExpandedEntryId] = React.useState<string | null>(null); 
 
  const [recentEntries, setRecentEntries] = React.useState<Array<{ 
    id: string; 
    email: string; 
    browser: string; 
    time: string; 
    submittedData?: Record<string, string>; 
  }>>([ 
    { id: 'Ingest-742910', email: 'justin@vercel.com', browser: 'Chrome', time: '2 mins ago', 
submittedData: { 'Full Name': 'Justin', 'Work Email Address': 'justin@vercel.com', 'How did 
you hear about FormFlow?': 'Product Hunt' } }, 
    { id: 'Ingest-391820', email: 'aws-ops@amazon.co.uk', browser: 'Firefox', time: '12 mins 
ago', submittedData: { 'Company Legal Name': 'Amazon UK Ops', 'Number of Seats': '250', 
'Cloud Hosting Preference': 'AWS Us-East-1' } }, 
    { id: 'Ingest-821035', email: 'framer-dev@framer.de', browser: 'Safari', time: '1 hr ago', 
submittedData: { 'Full Name': 'Framer Dev', 'Work Email Address': 'framer-dev@framer.de' } 
}, 
    { id: 'Ingest-140284', email: 'shivi14112007@gmail.com', browser: 'Edge', time: '3 hrs ago', 
submittedData: { 'Full Name': 'Shivi', 'Work Email Address': 'shivi14112007@gmail.com' } }, 
  ]); 
 
  // Form Field creation types helpers 
  const handleAddField = (type: FormField['type']) => { 
    const newId = `field-${Date.now()}`; 
    const defaultLabels: Record<FormField['type'], string> = { 
      text: 'Short Answer Input', 
      textarea: 'Long Answer Textarea', 
      select: 'Dropdown Selection', 
      checkbox: 'Choose Options Checkbox', 
      radio: 'Single Option Select', 
      email: 'Corporate Email Address', 
      number: 'Measurement or Count', 
    }; 
 
    const newField: FormField = { 
      id: newId, 
      type, 
      label: defaultLabels[type], 
      required: false, 
      placeholder: type === 'text' ? 'Write your response...' : type === 'email' ? 
'you@example.com' : undefined, 
      options: ['select', 'checkbox', 'radio'].includes(type) ? ['Option 1', 'Option 2', 'Option 3'] : 
undefined, 
    }; 
 
    setFields([...fields, newField]); 
    setSelectedFieldId(newId); 
  }; 
 
  // Modify individual properties of active field in config view 
  const updateFieldProperty = (fieldId: string, property: keyof FormField, value: any) => { 
    setFields( 
      fields.map((f) => { 
        if (f.id === fieldId) { 
          return { ...f, [property]: value }; 
        } 
        return f; 
      }) 
    ); 
  }; 
 
  // Delete a field 
  const handleDeleteField = (fieldId: string) => { 
    const updated = fields.filter((f) => f.id !== fieldId); 
    setFields(updated); 
    if (selectedFieldId === fieldId) { 
      setSelectedFieldId(updated.length > 0 ? updated[0].id : null); 
    } 
  }; 
 
  // Templates options list 
  const templates: FormTemplate[] = [ 
    { 
      id: 'template-1', 
      title: 'SaaS Customer Onboarding', 
      description: 'Collect details from high-tier enterprise clients with automated webhook 
integrations.', 
      createdAt: '2026-06-15', 
      submissionsCount: 140, 
      status: 'active', 
      fields: [ 
        { id: 'on-1', type: 'text', label: 'Company Legal Name', required: true }, 
        { id: 'on-2', type: 'number', label: 'Number of Seats', required: true }, 
        { id: 'on-3', type: 'select', label: 'Cloud Hosting Preference', required: true, options: 
['AWS Us-East-1', 'GCP Iowa', 'SaaS Multi-tenant'] }, 
      ] 
    }, 
    { 
      id: 'template-2', 
      title: 'Lambda Endpoint Bug Report', 
      description: 'Streamline developer crash reporting with trace log dumps directly on 
Amazon S3.', 
      createdAt: '2026-06-19', 
      submissionsCount: 8, 
      status: 'active', 
      fields: [ 
        { id: 'bug-1', type: 'text', label: 'AWS lambda Request ID', required: true }, 
        { id: 'bug-2', type: 'select', label: 'HTTP Failure Status Code', required: true, options: 
['500 Internal Error', '502 Bad Gateway', '403 Forbidden'] }, 
        { id: 'bug-3', type: 'textarea', label: 'JSON Stacktrace Dump', required: true, placeholder: 
'Paste string trace log...' }, 
      ] 
    }, 
    { 
      id: 'template-3', 
      title: 'Event RSVP & Ticket Registration', 
      description: 'Collect attendance records for technical webinars or AWS local community 
conferences.', 
      createdAt: '2026-06-21', 
      submissionsCount: 201, 
      status: 'draft', 
      fields: [ 
        { id: 'rsvp-1', type: 'text', label: 'Preferred Nickname', required: true }, 
        { id: 'rsvp-2', type: 'radio', label: 'Will you attend in-person?', required: true, options: 
['Yes, count me in!', 'No, online broadcast only', 'Undecided'] }, 
      ] 
    } 
  ]; 
 
  // Activate pre-configured templates 
  const handleLoadTemplate = (template: FormTemplate) => { 
    setFormTitle(template.title); 
    setFormDescription(template.description); 
    setFields(template.fields); 
    if (template.fields.length > 0) { 
      setSelectedFieldId(template.fields[0].id); 
    } 
    // Show premium toast feedback and switch back to builder 
    showToast(`Loaded Template: "${template.title}".`); 
    if (onTabChange) { 
      onTabChange('builder'); 
    } 
  }; 
 
  // Test form submission logic within our live React state container 
  const handleLiveFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
     
    // Strict interactive validations 
    const errors: Record<string, string> = {}; 
    fields.forEach((field) => { 
      if (field.required) { 
        if (field.type === 'checkbox') { 
          const selectedOpts = previewFormValues[field.id] || {}; 
          const hasChecked = Object.values(selectedOpts).some(v => v === true); 
          if (!hasChecked) { 
            errors[field.id] = "Please select at least one option"; 
          } 
        } else { 
          const val = previewFormValues[field.id]; 
          if (val === undefined || val === null || String(val).trim() === '') { 
            errors[field.id] = `${field.label} is required`; 
          } 
        } 
      } 
       
      if (field.type === 'email') { 
        const emailVal = previewFormValues[field.id]; 
        if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) { 
          errors[field.id] = "Please enter a valid email address"; 
        } 
      } 
    }); 
 
    if (Object.keys(errors).length > 0) { 
      setPreviewErrors(errors); 
      showToast("Validation failed. Please correct the highlighted fields.", "error"); 
      return; 
    } 
 
    const data = new FormData(e.currentTarget); 
     
    // Process form responses mapped to original field labels dynamically 
    const submittedData: Record<string, string> = {}; 
    let fallbackEmail = ''; 
 
    fields.forEach((field) => { 
      if (field.type === 'checkbox') { 
        const checkedOptions: string[] = []; 
        field.options?.forEach((opt, idx) => { 
          if (data.get(`${field.id}-${idx}`)) { 
            checkedOptions.push(opt); 
          } 
        }); 
        submittedData[field.label] = checkedOptions.length > 0 ? checkedOptions.join(', ') : 
'None selected'; 
      } else { 
        const val = data.get(field.id) as string || ''; 
        submittedData[field.label] = val || 'Not provided'; 
         
        if (field.type === 'email' && val) { 
          fallbackEmail = val; 
        } else if (!fallbackEmail && field.type === 'text' && val && val.includes('@')) { 
          fallbackEmail = val; 
        } 
      } 
    }); 
 
    if (!fallbackEmail) { 
      // Find suitable identity field, or generate an email from name 
      const textVal = data.get(fields[0]?.id || '') as string; 
      if (textVal && textVal.includes('@')) { 
        fallbackEmail = textVal; 
      } else if (textVal) { 
        fallbackEmail = `${textVal.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user'}@gmail.com`; 
      } else { 
        fallbackEmail = 'anonymous@formflow.io'; 
      } 
    } 
 
    // Dynamic telemetry updates 
    setTotalSubmissions((prev) => prev + 1); 
    setTotalViews((prev) => prev + 1); 
 
    const newEntry = { 
      id: `Ingest-${Math.floor(100000 + Math.random() * 900000)}`, 
      email: fallbackEmail, 
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)], 
      time: 'Just now', 
      submittedData 
    }; 
 
    setRecentEntries([newEntry, ...recentEntries]); 
    showToast(`Ingested new response!`, 'success'); 
 
    setFormSubmissionSuccessMessage(`Form response recorded successfully! Simulated 
AWS CloudWatch event triggered. Telemetry is saved in DynamoDB table "formflow_entries" 
and aggregated into your real-time analytics dashboard.`); 
     
    setTimeout(() => { 
      setIsPreviewModalOpen(false); 
      setFormSubmissionSuccessMessage(null); 
      // Automatically redirect to Analytics tab to see the live records! 
      if (onTabChange) { 
        onTabChange('analytics'); 
      } 
    }, 4500); 
  }; 
 
  // Chart data feeds 
  const conversionRate = Math.round((totalSubmissions / totalViews) * 100) || 35; 
 
  const submissionsTimeData = [ 
    { date: 'Jun 16', count: 12 }, 
    { date: 'Jun 17', count: 18 }, 
    { date: 'Jun 18', count: 15 }, 
    { date: 'Jun 19', count: 24 }, 
    { date: 'Jun 20', count: totalSubmissions - 5 }, 
    { date: 'Jun 21', count: totalSubmissions - 2 }, 
    { date: 'Jun 22', count: totalSubmissions }, 
  ]; 
 
  const browserData = [ 
    { name: 'Chrome', value: 45, color: '#6366F1' }, 
    { name: 'Safari', value: 25, color: '#8B5CF6' }, 
    { name: 'Firefox', value: 18, color: '#EC4899' }, 
    { name: 'Edge', value: 12, color: '#10B981' }, 
  ]; 
 
  return ( 
    <div className="w-full h-full"> 
       
      {/* 1. BUILDER VIEWS */} 
      {activeTab === 'builder' && ( 
        <div className="grid grid-cols-12 gap-8 items-start"> 
          {/* LEFT: Quick element palette selector */} 
          <div className="col-span-12 lg:col-span-3 space-y-5"> 
            <div className="border border-white/5 bg-zinc-950/40 rounded-2xl p-5 premium
shadow sticky top-4"> 
              <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4"> 
                Field Elements 
              </h3> 
              <p className="text-xs text-zinc-500 mb-4"> 
                Click to append new field rows to your AWS serverless template. 
              </p> 
 
              <div className="flex flex-col gap-2.5"> 
                {[ 
                  { type: 'text' as const, label: 'Text Input', desc: 'Single-line short responses' }, 
                  { type: 'textarea' as const, label: 'Textarea Field', desc: 'Multi-line detailed logs' }, 
                  { type: 'select' as const, label: 'Select dropdown', desc: 'Selection from listed 
options' }, 
                  { type: 'checkbox' as const, label: 'Checkbox selection', desc: 'Choose multiple 
items' }, 
                  { type: 'radio' as const, label: 'Radio Option list', desc: 'Pick unified check option' }, 
                  { type: 'number' as const, label: 'Numeric scale', desc: 'Collect digits and volumes' 
}, 
                ].map((item) => ( 
                  <button 
                    key={item.type} 
                    onClick={() => handleAddField(item.type)} 
                    className="w-full flex items-center justify-between p-3 rounded-xl border 
border-white/5 bg-zinc-900/30 hover:bg-white/5 hover:border-white/10 text-left transition
all group cursor-pointer outline-none" 
                  > 
                    <div className="space-y-0.5"> 
                      <p className="text-xs font-semibold text-zinc-300 group-hover:text-brand
primary transition-colors"> 
                        {item.label} 
                      </p> 
                      <p className="text-[10px] text-zinc-500 leading-none"> 
                        {item.desc} 
                      </p> 
                    </div> 
                    <Plus className="h-4 w-4 text-zinc-500 group-hover:text-brand-primary 
transition-transform group-hover:rotate-90" /> 
                  </button> 
                ))} 
              </div> 
            </div> 
          </div> 
 
          {/* MIDDLE: Live interactive schema editor workspace */} 
          <div className="col-span-12 lg:col-span-6 space-y-6"> 
            <Card className="p-6 relative overflow-hidden"> 
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand
primary to-brand-accent" /> 
               
              {/* TOP ACTION TOOLBAR BUTTONS */} 
              <div className="flex items-center justify-between border-b border-white/5 pb-4 
mb-5 flex-wrap gap-2 text-zinc-400"> 
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest 
uppercase"> 
                  <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span> 
                  <span>DND Active Canvas</span> 
                </div> 
                <div className="flex items-center gap-1.5"> 
                  <button 
                    onClick={handleLoadSampleTemplate} 
                    title="Load dynamic sample assessment template with multiple field styles" 
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-zinc
300 hover:text-white bg-white/5 rounded-md border border-white/5 hover:bg-white/10 
transition-all cursor-pointer outline-none" 
                  > 
                    <FolderOpen className="h-3 w-3 text-emerald-400" /> 
                    Load Template 
                  </button> 
                  <button 
                    onClick={handleClearWorkspace} 
                    title="Remove all form fields and start clean" 
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-zinc
400 hover:text-rose-400 bg-white/5 rounded-md border border-white/5 hover:bg-rose
500/10 hover:border-rose-500/20 transition-all cursor-pointer outline-none" 
                  > 
                    <Trash2 className="h-3.5 w-3.5" /> 
                    Clear 
                  </button> 
                </div> 
              </div> 
 
              {/* Form Metadata header editable */} 
              <div className="space-y-2 border-b border-white/5 pb-4.5 mb-6"> 
                <input 
                  type="text" 
                  value={formTitle} 
                  onChange={(e) => setFormTitle(e.target.value)} 
                  className="w-full bg-transparent font-display font-bold text-xl sm:text-2xl text
white outline-none focus:border-b focus:border-white/20 pb-1" 
                  placeholder="Form Title" 
                /> 
                <textarea 
                  value={formDescription} 
                  onChange={(e) => setFormDescription(e.target.value)} 
                  className="w-full bg-transparent text-sm text-zinc-400 outline-none resize-none 
min-h-[40px] focus:border-b focus:border-white/20" 
                  placeholder="Write a form welcome subtitle..." 
                /> 
              </div> 
 
              {/* Form rows listing */} 
              <div className="space-y-4"> 
                <AnimatePresence initial={false}> 
                  {fields.length === 0 ? ( 
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-center py-12 rounded-xl border border-dashed border
white/10" 
                    > 
                      <p className="text-zinc-500 text-sm">Your form has no fields yet.</p> 
                      <p className="text-zinc-600 text-xs mt-1">Select field tools on the left menu to 
build layout.</p> 
                    </motion.div> 
                  ) : ( 
                    fields.map((field, idx) => { 
                      const isSelected = selectedFieldId === field.id; 
                      return ( 
                        <motion.div 
                          key={field.id} 
                          initial={{ opacity: 0, y: 15 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, scale: 0.95 }} 
                          draggable 
                          onDragStart={(e) => { 
                            setDraggedIndex(idx); 
                            e.dataTransfer.effectAllowed = 'move'; 
                          }} 
                          onDragOver={(e) => { 
                            e.preventDefault(); 
                            setDragOverIndex(idx); 
                          }} 
                          onDragLeave={() => setDragOverIndex(null)} 
                          onDrop={(e) => { 
                            e.preventDefault(); 
                            handleDropField(idx); 
                          }} 
                          onDragEnd={() => { 
                            setDraggedIndex(null); 
                            setDragOverIndex(null); 
                          }} 
                          className={cn( 
                            "group/row relative p-4 pl-16 rounded-xl border transition-all duration-200", 
                            isSelected 
                              ? "bg-white/[0.03] border-brand-primary premium-shadow" 
                              : "bg-transparent border-white/5 hover:border-white/10", 
                            dragOverIndex === idx ? "border-dashed border-indigo-500 bg-indigo
500/10" : "" 
                          )} 
                          onClick={() => setSelectedFieldId(field.id)} 
                        > 
                          {/* Row Controls */} 
                          <div className="absolute right-3.5 top-3.5 flex items-center gap-1.5 opacity
0 group-hover/row/row:opacity-100 transition-opacity"> 
                            <Tooltip content="Config options"> 
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  setSelectedFieldId(field.id); 
                                }} 
                                className="p-1 rounded bg-zinc-950 text-zinc-400 hover:text-white 
border border-white/5 cursor-pointer" 
                              > 
                                <Settings2 className="h-3.5 w-3.5" /> 
                              </button> 
                            </Tooltip> 
                            <Tooltip content="Delete row"> 
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  handleDeleteField(field.id); 
                                }} 
                                className="p-1 rounded bg-zinc-950 text-rose-400 hover:text-rose-300 
border border-white/5 cursor-pointer" 
                              > 
                                <Trash2 className="h-3.5 w-3.5" /> 
                              </button> 
                            </Tooltip> 
                          </div> 
 
                          {/* LEFT-SIDE GRIP + INTERACTIVE ARROWS TOOLBAR */} 
                          <div className="absolute left-3 top-3.5 flex items-center gap-1.5 z-10 select
none"> 
                            <div  
                              className="text-zinc-600 hover:text-indigo-400 p-0.5 cursor-grab 
active:cursor-grabbing" 
                              title="Drag to reorder" 
                            > 
                              <GripVertical className="h-3.5 w-3.5 shrink-0" /> 
                            </div> 
                             
                            <div className="flex flex-col gap-0.5"> 
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  handleMoveField(idx, 'up'); 
                                }} 
                                disabled={idx === 0} 
                                title="Move Field Up" 
                                className="p-0.5 rounded text-zinc-600 hover:text-indigo-400 
disabled:opacity-25 disabled:hover:text-zinc-600 cursor-pointer transition-colors" 
                              > 
                                <ArrowUp className="h-2.5 w-2.5" /> 
                              </button> 
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  handleMoveField(idx, 'down'); 
                                }} 
                                disabled={idx === fields.length - 1} 
                                title="Move Field Down" 
                                className="p-0.5 rounded text-zinc-600 hover:text-indigo-400 
disabled:opacity-25 disabled:hover:text-zinc-600 cursor-pointer transition-colors" 
                              > 
                                <ArrowDown className="h-2.5 w-2.5" /> 
                              </button> 
                            </div> 
 
                            <span className="text-[10px] font-bold text-indigo-400/80 font-mono ml
1"> 
                              0{idx + 1} 
                            </span> 
                          </div> 
 
                          <div className="pt-2 w-full"> 
                            <p className="text-xs font-semibold text-zinc-300 mb-1.5 flex items-center 
gap-1"> 
                              {field.label || 'Untitled Field'} 
                              {field.required && <span className="text-rose-500">*</span>} 
                            </p> 
 
                            {/* Render different element placeholder states */} 
                            {field.type === 'text' && ( 
                              <div className="h-9 px-3.5 bg-zinc-900/40 rounded-lg border border
white/5 text-zinc-500 text-xs flex items-center"> 
                                {field.placeholder || 'Text placeholder...'} 
                              </div> 
                            )} 
 
                            {field.type === 'email' && ( 
                              <div className="h-9 px-3.5 bg-zinc-900/40 rounded-lg border border
white/5 text-zinc-500 text-xs flex items-center"> 
                                {field.placeholder || 'you@domain.com'} 
                              </div> 
                            )} 
 
                            {field.type === 'number' && ( 
                              <div className="h-9 px-3.5 bg-zinc-900/40 rounded-lg border border
white/5 text-zinc-500 text-xs flex items-center"> 
                                {field.placeholder || 'Numeric input...'} 
                              </div> 
                            )} 
 
                            {field.type === 'textarea' && ( 
                              <div className="h-16 p-3 bg-zinc-900/40 rounded-lg border border
white/5 text-zinc-500 text-xs"> 
                                {field.placeholder || 'Long response lines...'} 
                              </div> 
                            )} 
 
                            {field.type === 'select' && ( 
                              <div className="h-9 px-3.5 bg-zinc-900/40 rounded-lg border border
white/5 text-zinc-400 text-xs flex items-center justify-between"> 
                                <span>{field.options?.[0] || 'Select an option'}</span> 
                                <span className="text-zinc-600">▼</span> 
                              </div> 
                            )} 
 
                            {field.type === 'checkbox' && ( 
                              <div className="flex gap-4 flex-wrap pt-1.5"> 
                                {(field.options || ['Check Option 1']).map((opt, i) => ( 
                                  <div key={i} className="flex items-center gap-2"> 
                                    <div className="h-4.5 w-4.5 rounded border border-white/10 bg-zinc
950/40" /> 
                                    <span className="text-xs text-zinc-400">{opt}</span> 
                                  </div> 
                                ))} 
                              </div> 
                            )} 
 
                            {field.type === 'radio' && ( 
                              <div className="flex gap-4 flex-wrap pt-1.5"> 
                                {(field.options || ['Radio 1']).map((opt, i) => ( 
                                  <div key={i} className="flex items-center gap-2"> 
                                    <div className="h-4.5 w-4.5 rounded-full border border-white/10 bg
zinc-950/40" /> 
                                    <span className="text-xs text-zinc-400">{opt}</span> 
                                  </div> 
                                ))} 
                              </div> 
                            )} 
                          </div> 
                        </motion.div> 
                      ); 
                    }) 
                  )} 
                </AnimatePresence> 
              </div> 
 
              {/* Preview Action panel bar */} 
              <div className="border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row gap-4 
items-center justify-between"> 
                <div className="flex items-center gap-2 text-xs text-zinc-500"> 
                  <Database className="h-4 w-4 text-indigo-400" /> 
                  <span>Interactive AWS Serverless Schema compilation</span> 
                </div> 
                <div className="flex gap-2 w-full sm:w-auto"> 
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsSchemaExportModalOpen(true)} 
                    disabled={fields.length === 0} 
                    className="h-9 px-3 text-xs w-full sm:w-auto" 
                  > 
                    <Download className="h-3.5 w-3.5 mr-1" /> 
                    Export JSON Schema 
                  </Button> 
                  <Button 
                    variant="primary" 
                    onClick={handleOpenPreview} 
                    disabled={fields.length === 0} 
                    className="bg-indigo-600 hover:bg-indigo-500 h-9 px-4.5 text-xs w-full sm:w
auto" 
                  > 
                    <Eye className="h-4 w-4" /> 
                    Test Live Form Sandbox 
                  </Button> 
                </div> 
              </div> 
            </Card> 
          </div> 
 
          {/* RIGHT: Selected field settings config */} 
          <div className="col-span-12 lg:col-span-3 space-y-6"> 
            <div className="border border-white/5 bg-zinc-950/40 rounded-2xl p-5 premium
shadow sticky top-4"> 
              <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4 flex 
items-center justify-between"> 
                <span>Field Settings</span> 
                <Badge variant="secondary">CONFIG</Badge> 
              </h3> 
 
              {selectedFieldId ? ( 
                (() => { 
                  const activeField = fields.find((f) => f.id === selectedFieldId); 
                  if (!activeField) return <p className="text-xs text-zinc-500">No field matches 
selection</p>; 
 
                  return ( 
                    <div className="space-y-4 text-xs"> 
                      <Input 
                        label="Label Text" 
                        value={activeField.label} 
                        onChange={(e) => updateFieldProperty(activeField.id, 'label', e.target.value)} 
                      /> 
 
                      {['text', 'textarea', 'email', 'number'].includes(activeField.type) && ( 
                        <Input 
                          label="Placeholder String" 
                          value={activeField.placeholder || ''} 
                          onChange={(e) => updateFieldProperty(activeField.id, 'placeholder', 
e.target.value)} 
                        /> 
                      )} 
 
                      {/* Dropdown/Multi inputs option lists editable */} 
                      {['select', 'checkbox', 'radio'].includes(activeField.type) && ( 
                        <div className="space-y-2"> 
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking
wider block"> 
                            Options (Comma-separated) 
                          </label> 
                          <textarea 
                            value={activeField.options?.join(', ') || ''} 
                            onChange={(e) => 
                              updateFieldProperty( 
                                activeField.id, 
                                'options', 
                                e.target.value.split(',').map((o) => o.trim()) 
                              ) 
                            } 
                            className="w-full min-h-[70px] p-2 bg-zinc-950/50 rounded-lg border 
border-white/5 text-zinc-200 font-mono text-xs focus:ring-1 focus:ring-brand-primary" 
                          /> 
                        </div> 
                      )} 
 
                      <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border 
border-white/5 rounded-xl"> 
                        <span className="font-semibold text-zinc-300">Mandatory / 
Required</span> 
                        <input 
                          type="checkbox" 
                          checked={activeField.required} 
                          onChange={(e) => updateFieldProperty(activeField.id, 'required', 
e.target.checked)} 
                          className="h-4.5 w-4.5 accent-brand-primary rounded" 
                        /> 
                      </div> 
 
                      <div className="border-t border-white/5 pt-4"> 
                        <Button 
                          variant="ghost" 
                          onClick={() => handleDeleteField(activeField.id)} 
                          className="w-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 h
8" 
                        > 
                          <Trash2 className="h-3.5 w-3.5" /> 
                          Delete Row Element 
                        </Button> 
                      </div> 
                    </div> 
                  ); 
                })() 
              ) : ( 
                <div className="text-center py-8"> 
                  <p className="text-xs text-zinc-500">Pick any element to access field properties 
configuration.</p> 
                </div> 
              )} 
            </div> 
          </div> 
        </div> 
      )} 
 
      {/* 2. TEMPLATES VIEW */} 
      {activeTab === 'templates' && ( 
        <div className="space-y-6"> 
          <div className="max-w-xl"> 
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2"> 
              <FileCheck className="h-5 w-5 text-brand-primary" /> 
              Preconfigured AWS Serverless Form Blueprints 
            </h2> 
            <p className="text-xs text-zinc-400 mt-1"> 
              Bootstrap cloud forms immediately using optimized template parameters. Choosing 
any template will replace elements in your current builder console workspace. 
            </p> 
          </div> 
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
            {templates.map((tpl) => ( 
              <Card key={tpl.id} className="relative overflow-hidden flex flex-col p-6 h-full justify
between"> 
                <CardHeader className="p-0 border-b-0 space-y-2"> 
                  <div className="flex items-center justify-between"> 
                    <Badge variant={tpl.status === 'active' ? 'success' : 'secondary'}> 
                      {tpl.status} 
                    </Badge> 
                    <span className="text-[10px] text-zinc-500 font-mono"> 
                      {tpl.fields.length} rows configured 
                    </span> 
                  </div> 
                  <h3 className="font-bold text-sm text-zinc-200"> 
                    {tpl.title} 
                  </h3> 
                  <p className="text-xs text-zinc-400 leading-relaxed"> 
                    {tpl.description} 
                  </p> 
                </CardHeader> 
 
                <CardContent className="p-0 py-4"> 
                  <div className="bg-zinc-950/60 rounded-xl p-3 border border-white/5 space-y
1.5 text-[11px] font-mono"> 
                    <p className="text-brand-accent tracking-widest uppercase text-[9px] font
bold">fields preview:</p> 
                    {tpl.fields.map((f, i) => ( 
                      <div key={i} className="flex items-center gap-1.5 text-zinc-500"> 
                        <span className="text-zinc-600">•</span> 
                        <span className="text-zinc-400">{f.label}</span> 
                        <span className="text-[10px] text-zinc-600">({f.type})</span> 
                      </div> 
                    ))} 
                  </div> 
                </CardContent> 
 
                <div className="pt-2 border-t border-white/5 flex items-center justify-between"> 
                  <span className="text-[10px] text-zinc-500">Hits: 
~{tpl.submissionsCount}</span> 
                  <Button 
                    variant="secondary" 
                    onClick={() => handleLoadTemplate(tpl)} 
                    className="h-8 text-xs" 
                  > 
                    Load Template 
                    <ChevronRight className="h-4 w-4" /> 
                  </Button> 
                </div> 
              </Card> 
            ))} 
          </div> 
        </div> 
      )} 
 
      {/* 3. REAL-TIME ANALYTICS VIEW */} 
      {activeTab === 'analytics' && ( 
        <div className="space-y-8"> 
          {/* Top Info line */} 
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 
border-b border-white/5 pb-4"> 
            <div className="space-y-0.5"> 
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2"> 
                <Activity className="h-4.5 w-4.5 text-emerald-400 animate-pulse" /> 
                Live Submission Webhook Monitoring 
              </h2> 
              <p className="text-xs text-zinc-400"> 
                Mock sensor streams showing direct database hits and browser telemetry. 
              </p> 
            </div> 
             
            <div className="flex items-center gap-3"> 
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" /> 
              <span className="text-xs text-zinc-500 font-medium">Real-time Sync Active</span> 
              <Button 
                variant="secondary" 
                onClick={() => { 
                  setTotalViews((prev) => prev + Math.floor(Math.random() * 8) + 1); 
                  setTotalSubmissions((prev) => prev + Math.floor(Math.random() * 2)); 
                  showToast("Simulated real-time server pull... Stats refreshed.", "success"); 
                }} 
                className="h-8 px-3 text-xs" 
              > 
                <RefreshCw className="h-3.5 w-3.5 mr-1" /> 
                Fetch Pull 
              </Button> 
            </div> 
          </div> 
 
          {/* Cards metrics top */} 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
            {[ 
              { title: 'Total Form Hits', val: totalViews, suffix: 'views', tag: 'Traffic', icon: Eye, color: 
'text-indigo-400 bg-indigo-500/10' }, 
              { title: 'Valid Ingests', val: totalSubmissions, suffix: 'records', tag: 'DynamoDB', icon: 
FileCheck, color: 'text-emerald-400 bg-emerald-500/10' }, 
              { title: 'Ingestion conversion', val: `${conversionRate}%`, suffix: 'completed', tag: 
'Efficiency', icon: TrendingUp, color: 'text-amber-400 bg-amber-500/10' }, 
              { title: 'Avg Ingestion Duration', val: '42s', suffix: 'response time', tag: 'Performance', 
icon: Clock, color: 'text-violet-400 bg-violet-500/10' }, 
            ].map((card, i) => { 
              const Icon = card.icon; 
              return ( 
                <Card key={i} className="p-5 flex flex-col justify-between"> 
                  <div className="flex items-center justify-between"> 
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking
wider">{card.title}</span> 
                    <span className="text-[10px] font-bold text-zinc-600">{card.tag}</span> 
                  </div> 
                  <div className="flex items-baseline gap-2 mt-4.5"> 
                    <span className="text-2xl font-bold tracking-tight text-white">{card.val}</span> 
                    <span className="text-xs text-zinc-500">{card.suffix}</span> 
                  </div> 
                  <div className="flex items-center gap-1.5 mt-4 border-t border-white/5 pt-3"> 
                    <div className={`p-1 rounded-md ${card.color}`}> 
                      <Icon className="h-3.5 w-3.5" /> 
                    </div> 
                    <span className="text-[10px] text-zinc-400 font-medium">Auto-computed by 
AWS</span> 
                  </div> 
                </Card> 
              ); 
            })} 
          </div> 
 
          {/* Graphical Analytics Charts */} 
          <div className="grid grid-cols-12 gap-8"> 
            {/* Timeline LineChart */} 
            <div className="col-span-12 lg:col-span-8"> 
              <Card className="p-6"> 
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6 
font-display"> 
                  Schema Ingestion Record Volume (Daily) 
                </h3> 
                <div className="h-[280px] w-full font-sans"> 
                  <ResponsiveContainer width="100%" height="100%"> 
                    <LineChart data={submissionsTimeData} margin={{ top: 10, right: 10, left: -20, 
bottom: 0 }}> 
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /> 
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={11} 
tickLine={false} /> 
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} /> 
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: '#18181b', 
                          borderColor: 'rgba(255,255,255,0.1)', 
                          borderRadius: '12px', 
                          color: '#f4f4f5' 
                        }} 
                      /> 
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#6366F1" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 1 }} 
                        activeDot={{ r: 6 }} 
                      /> 
                    </LineChart> 
                  </ResponsiveContainer> 
                </div> 
              </Card> 
            </div> 
 
            {/* Browser Segment PieChart */} 
            <div className="col-span-12 lg:col-span-4"> 
              <Card className="p-6 flex flex-col justify-between"> 
                <div> 
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb
6 font-display"> 
                    Browser Telemetry 
                  </h3> 
                  <div className="h-[180px] w-full flex items-center justify-center"> 
                    <ResponsiveContainer width="100%" height="100%"> 
                      <PieChart> 
                        <Pie 
                          data={browserData} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={50} 
                          outerRadius={70} 
                          paddingAngle={5} 
                          dataKey="value" 
                        > 
                          {browserData.map((entry, index) => ( 
                            <Cell key={`cell-${index}`} fill={entry.color} /> 
                          ))} 
                        </Pie> 
                        <RechartsTooltip /> 
                      </PieChart> 
                    </ResponsiveContainer> 
                  </div> 
                </div> 
 
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 text-[11px]"> 
                  {browserData.map((item, idx) => ( 
                    <div key={idx} className="flex items-center gap-2"> 
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} 
/> 
                      <span className="text-zinc-400 font-medium">{item.name}</span> 
                      <span className="text-zinc-600">({item.value}%)</span> 
                    </div> 
                  ))} 
                </div> 
              </Card> 
            </div> 
          </div> 
 
          {/* Recent Telemetry Ingests logs table */} 
          <Card className="p-6"> 
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb
4"> 
              <div> 
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font
display"> 
                  Live AWS Lambda Form Entry Streams 
                </h3> 
                <p className="text-[10px] text-zinc-500 mt-0.5"> 
                  Click any ingestion request below to expand the full key-value payload mapped 
directly to your active form fields. 
                </p> 
              </div> 
              <Badge variant="success" className="self-start sm:self-center">DynamoDB 
Connected</Badge> 
            </div> 
             
            <div className="overflow-x-auto"> 
              <table className="w-full text-left border-collapse"> 
                <thead> 
                  <tr className="border-b border-white/5 text-xs text-zinc-500 font-medium"> 
                    <th className="py-3 px-4">Ingestion Request ID</th> 
                    <th className="py-3 px-4">Primary Identity Input</th> 
                    <th className="py-3 px-4">User-Agent Engine</th> 
                    <th className="py-3 px-4 text-right">Timestamp Response</th> 
                  </tr> 
                </thead> 
                <tbody className="divide-y divide-white/[0.03] text-xs text-zinc-300"> 
                  {recentEntries.map((row) => { 
                    const isExpanded = expandedEntryId === row.id; 
                    return ( 
                      <React.Fragment key={row.id}> 
                        <tr  
                          onClick={() => setExpandedEntryId(isExpanded ? null : row.id)} 
                          className="hover:bg-white/[0.02] cursor-pointer transition-colors border-b 
border-white/[0.02]" 
                        > 
                          <td className="py-3.5 px-4 font-mono text-[11px] text-indigo-400 font-bold 
flex items-center gap-2"> 
                            {isExpanded ? ( 
                              <ChevronDown className="h-3 w-3 text-zinc-400" /> 
                            ) : ( 
                              <ChevronRight className="h-3 w-3 text-zinc-400 font-bold" /> 
                            )} 
                            {row.id} 
                          </td> 
                          <td className="py-3.5 px-4 font-medium text-zinc-300">{row.email}</td> 
                          <td className="py-3.5 px-4"> 
                            <Badge variant="secondary" className="bg-white/5 text-zinc-400 text
[10px] py-0.5 px-2 border border-white/5">{row.browser}</Badge> 
                          </td> 
                          <td className="py-3.5 px-4 text-right text-zinc-500 font-mono text
[10px]">{row.time}</td> 
                        </tr> 
                        {isExpanded && ( 
                          <tr> 
                            <td colSpan={4} className="bg-zinc-950/80 px-8 py-5 text-xs rounded-lg"> 
                              <div className="space-y-4 max-w-2xl"> 
                                <div className="flex items-center justify-between"> 
                                  <span className="text-[10px] font-bold text-indigo-400 uppercase 
tracking-widest flex items-center gap-1.5"> 
                                    <Database className="h-3.5 w-3.5" /> 
                                    DynamoDB Document Attribute Payload Configuration 
                                  </span> 
                                  <span className="text-[9px] text-zinc-500 font-mono bg-white/5 px-2 
py-0.5 rounded">UUID SECURED</span> 
                                </div> 
                                {row.submittedData && Object.keys(row.submittedData).length > 0 ? ( 
                                  <div className="grid grid-cols-1 gap-2 border border-white/5 bg
[#09090b]/60 p-4 rounded-xl"> 
                                    {Object.entries(row.submittedData).map(([lbl, val]) => ( 
                                      <div key={lbl} className="flex flex-col sm:flex-row sm:items-start 
sm:justify-between py-1.5 border-b border-white/[0.02] last:border-0 gap-1"> 
                                        <span className="text-zinc-400 font-semibold">{lbl}</span> 
                                        <span className="text-zinc-100 font-bold bg-white/5 px-2.5 py-1 
rounded text-left sm:text-right max-w-md truncate font-sans text-[11px]"> 
                                          {val} 
                                        </span> 
                                      </div> 
                                    ))} 
                                  </div> 
                                ) : ( 
                                  <div className="p-3 border border-dashed border-white/10 rounded-xl 
bg-white/[0.01] text-zinc-500 italic text-center"> 
                                    No custom responses configured on this default dummy entry log. Try 
testing your live built form in the "Form Builder" to submit custom answers! 
                                  </div> 
                                )} 
                              </div> 
                            </td> 
                          </tr> 
                        )} 
                      </React.Fragment> 
                    ); 
                  })} 
                </tbody> 
              </table> 
            </div> 
          </Card> 
        </div> 
      )} 
 
      {/* 4. SETTINGS VIEW */} 
      {activeTab === 'settings' && ( 
        <div className="max-w-2xl space-y-6"> 
          <Card className="p-6"> 
            <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 mb-1"> 
              <Settings2 className="h-4.5 w-4.5 text-brand-primary" /> 
              Developer API & AWS Configurations 
            </h3> 
            <p className="text-xs text-zinc-400 mb-6"> 
              Configure AWS Gateway routing parameters and validation rules for safe production. 
            </p> 
 
            <div className="space-y-4"> 
              <div className="space-y-1.5"> 
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider 
block"> 
                  AWS Gateway Ingestion Target URL 
                </label> 
                <div className="flex gap-2"> 
                  <input 
                    type="text" 
                    disabled 
                    value="https://api-gateway.us-east-1.amazonaws.com/deploy/v3/submissions" 
                    className="flex-1 h-10 px-3.5 bg-zinc-950/60 border border-white/5 rounded-xl 
text-zinc-500 text-xs font-mono select-all" 
                  /> 
                  <Button variant="secondary" onClick={() => { 
                    navigator.clipboard.writeText("https://api-gateway.us-east
1.amazonaws.com/deploy/v3/submissions"); 
                    showToast("Gateway link copied to clipboard!", "success"); 
                  }} className="h-10 text-xs shrink-0"> 
                    Copy Uri 
                  </Button> 
                </div> 
              </div> 
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                <div className="space-y-1.5"> 
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider 
block"> 
                    CORS Origin policy whitelist 
                  </label> 
                  <input 
                    type="text" 
                    placeholder="*" 
                    className="w-full h-10 px-3.5 bg-zinc-950/40 border border-white/10 rounded
xl text-zinc-100 text-xs focus:ring-1 focus:ring-brand-primary outline-none" 
                  /> 
                </div> 
                <div className="space-y-1.5"> 
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider 
block"> 
                    DynamoDB Billing Policy 
                  </label> 
                  <select className="w-full h-10 px-3.5 bg-zinc-950/40 border border-white/10 
rounded-xl text-zinc-400 text-xs outline-none"> 
                    <option>On-Demand Scaling (Free Tier Safe)</option> 
                    <option>Provisioned Provision Level Capacity</option> 
                  </select> 
                </div> 
              </div> 
 
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2"> 
                <p className="text-xs font-semibold text-zinc-300">Form Submission webhook 
triggers</p> 
                <p className="text-xs text-zinc-500 leading-normal"> 
                  Send incoming responses to subnetwork automation platforms like Slack or Zapier 
immediately when saved in DynamoDB. 
                </p> 
                <input 
                  type="text" 
                  placeholder="https://hooks.slack.com/services/..." 
                  className="w-full h-10 px-3.5 bg-zinc-950/40 border border-white/10 rounded-xl 
text-zinc-100 text-xs focus:ring-1 focus:ring-brand-primary outline-none" 
                /> 
              </div> 
 
              <div className="pt-4 border-t border-white/5 flex justify-end gap-3"> 
                <Button variant="ghost" onClick={() => showToast("Settings configuration 
bypassed", "info")}> 
                  Discard 
                </Button> 
                <Button variant="primary" onClick={() => showToast("Simulated sandbox 
configurations recorded.", "success")}> 
                  Save Workspace System Configuration 
                </Button> 
              </div> 
            </div> 
          </Card> 
        </div> 
      )} 
 
      {/* MODAL: LIVE FORM INGESTION PLAYGROUND */} 
      <Modal 
        isOpen={isPreviewModalOpen} 
        onClose={() => setIsPreviewModalOpen(false)} 
        title={`Live Endpoint Form Sandbox: "${formTitle}"`} 
        size="xl" 
      > 
        <div className="space-y-6 text-zinc-300 text-sm"> 
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-zinc
950/40 p-4 rounded-xl border border-white/5"> 
            <div className="space-y-0.5 text-left"> 
              <p className="text-xs font-semibold text-zinc-200">Interactive Form Simulation 
Engine</p> 
              <p className="text-[11px] text-zinc-500"> 
                Configure visual theme styles and device breakpoints in real time. 
              </p> 
            </div> 
             
            <div className="flex flex-wrap items-center gap-4"> 
              {/* Responsive Breakpoint Selector */} 
              <div className="flex items-center gap-2"> 
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mr
1">Viewport:</span> 
                <div className="flex items-center bg-zinc-950/80 p-1 rounded-lg border border
white/5 gap-1"> 
                  {[ 
                    { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' }, 
                    { id: 'tablet', label: 'Tablet', icon: Tablet, width: '640px' }, 
                    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px' }, 
                  ].map((bp) => { 
                    const IconComponent = bp.icon; 
                    const isActive = previewBreakpoint === bp.id; 
                    return ( 
                      <button 
                        key={bp.id} 
                        type="button" 
                        onClick={() => { 
                          setPreviewBreakpoint(bp.id as any); 
                          showToast(`Switched preview viewport to ${bp.label} (${bp.width})`, 'info'); 
                        }} 
                        className={cn( 
                          "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold 
transition-all cursor-pointer outline-none border", 
                          isActive  
                            ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30 shadow
[0_2px_8px_rgba(99,102,241,0.15)]" 
                            : "text-zinc-500 hover:text-zinc-350 hover:bg-white/[0.02] border
transparent" 
                        )} 
                        title={`${bp.label} Mode - ${bp.width}`} 
                      > 
                        <IconComponent className="h-3 w-3" /> 
                        <span>{bp.label}</span> 
                      </button> 
                    ); 
                  })} 
                </div> 
              </div> 
 
              {/* Visual Theme Preset Selectors */} 
              <div className="flex items-center gap-2"> 
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mr
1">Brand Theme:</span> 
                <div className="flex items-center gap-1.5 bg-zinc-950/80 p-1 rounded-lg border 
border-white/5"> 
                  {[ 
                    { id: 'indigo', color: '#6366f1', label: 'Indigo' }, 
                    { id: 'emerald', color: '#10b981', label: 'Emerald' }, 
                    { id: 'amber', color: '#f59e0b', label: 'Amber' }, 
                    { id: 'rose', color: '#f43f5e', label: 'Rose' }, 
                    { id: 'slate', color: '#64748b', label: 'Slate' }, 
                  ].map((theme) => ( 
                    <button 
                      key={theme.id} 
                      type="button" 
                      onClick={() => { 
                        setPreviewTheme(theme.id as any); 
                        showToast(`Switched active client preset theme to ${theme.label}!`, 'info'); 
                      }} 
                      style={{ backgroundColor: theme.color }} 
                      title={`Apply ${theme.label} preset`} 
                      className={cn( 
                        "h-4 w-4 rounded-full transition-all duration-150 cursor-pointer border 
hover:scale-110 outline-none", 
                        previewTheme === theme.id ? "scale-110 border-white ring-1 ring-white/10" : 
"border-transparent opacity-60" 
                      )} 
                    /> 
                  ))} 
                </div> 
              </div> 
            </div> 
          </div> 
 
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left"> 
             
            {/* LEFT COLUMN: LIVE RENDERED WEB FORM PREVIEW */} 
            <div  
              className="lg:col-span-7 space-y-4 flex flex-col justify-start" 
              style={{ 
                '--color-brand-primary':  
                  previewTheme === 'indigo' ? '#6366f1' :  
                  previewTheme === 'emerald' ? '#10b981' :  
                  previewTheme === 'amber' ? '#f59e0b' :  
                  previewTheme === 'rose' ? '#f43f5e' : '#64748b' 
              } as React.CSSProperties} 
            > 
              {/* Device Shell Header Label */} 
              {previewBreakpoint !== 'desktop' && ( 
                <div  
                  className="flex items-center justify-between px-3.5 py-1.5 bg-zinc-900 border 
border-white/5 rounded-lg text-[10px] font-mono text-zinc-400 w-full mx-auto transition-all 
duration-300" 
                  style={{ 
                    maxWidth:  
                      previewBreakpoint === 'mobile' ? '375px' :  
                      previewBreakpoint === 'tablet' ? '640px' : '100%' 
                  }} 
                > 
                  <span className="flex items-center gap-1.5 font-sans font-medium text-zinc
300"> 
                    {previewBreakpoint === 'mobile' && <Smartphone className="h-3.5 w-3.5 text
indigo-400" />} 
                    {previewBreakpoint === 'tablet' && <Tablet className="h-3.5 w-3.5 text
emerald-400" />} 
                    <span className="capitalize">{previewBreakpoint} Viewport</span> 
                  </span> 
                  <span className="text-zinc-500 font-bold">{previewBreakpoint === 'mobile' ? 
'375px × 667px' : '640px × 800px'}</span> 
                </div> 
              )} 
 
              <div  
                className="w-full mx-auto transition-all duration-300 ease-in-out" 
                style={{ 
                  maxWidth:  
                    previewBreakpoint === 'mobile' ? '375px' :  
                    previewBreakpoint === 'tablet' ? '640px' : '100%' 
                }} 
              > 
                <Card className="bg-zinc-950/30 p-6 md:p-7 border border-white/10 relative 
overflow-hidden w-full transition-all duration-300"> 
                <div  
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300" 
                  style={{ 
                    backgroundColor:  
                      previewTheme === 'indigo' ? '#6366f1' :  
                      previewTheme === 'emerald' ? '#10b981' :  
                      previewTheme === 'amber' ? '#f59e0b' :  
                      previewTheme === 'rose' ? '#f43f5e' : '#64748b' 
                  }} 
                /> 
                 
                <div className="space-y-1.5 border-b border-white/5 pb-4.5 mb-6"> 
                  <h2 className="text-base font-bold text-white tracking-snug flex items-center 
gap-2"> 
                    <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ 
                      backgroundColor:  
                        previewTheme === 'indigo' ? '#6366f1' :  
                        previewTheme === 'emerald' ? '#10b981' :  
                        previewTheme === 'amber' ? '#f59e0b' :  
                        previewTheme === 'rose' ? '#f43f5e' : '#64748b' 
                    }}></span> 
                    {formTitle || 'Untitled Feedback Form'} 
                  </h2> 
                  {formDescription && ( 
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed"> 
                      {formDescription} 
                    </p> 
                  )} 
                </div> 
 
                {formSubmissionSuccessMessage ? ( 
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 
text-emerald-400 space-y-3 flex flex-col items-center text-center" 
                  > 
                    <CheckCircle2 className="h-9 w-9 text-emerald-400 animate-bounce" /> 
                    <p className="font-bold text-sm">Serverless Record Ingested</p> 
                    <p className="text-[11px] text-zinc-400 leading-normal max-w-sm"> 
                      Your response has been written directly into the simulated DynamoDB database 
schema and recorded in AWS Analytics telemetry charts! 
                    </p> 
                  </motion.div> 
                ) : ( 
                  <form onSubmit={handleLiveFormSubmit} className="space-y-5"> 
                    {fields.length === 0 ? ( 
                      <div className="py-8 text-center text-zinc-500 text-xs italic border border
dashed border-white/5 bg-zinc-950/20 rounded-xl space-y-2"> 
                        <p>No active form fields customized yet.</p> 
                        <p className="text-[10px] text-zinc-600">Close this dialog and click the field 
palette on the left panel to append inputs!</p> 
                      </div> 
                    ) : ( 
                      fields.map((field) => { 
                        const labelWithReq = field.required ? `${field.label} *` : field.label; 
                        const errorMsg = previewErrors[field.id]; 
                         
                        return ( 
                          <div key={field.id} className="space-y-1 text-xs text-left"> 
                            {field.type === 'text' && ( 
                              <Input 
                                label={labelWithReq} 
                                placeholder={field.placeholder || "Enter text response..."} 
                                required={field.required} 
                                name={field.id} 
                                value={previewFormValues[field.id] || ''} 
                                onChange={(e) => { 
                                  setPreviewFormValues(prev => ({ ...prev, [field.id]: e.target.value })); 
                                  if (previewErrors[field.id]) { 
                                    setPreviewErrors(prev => { 
                                      const next = { ...prev }; 
                                      delete next[field.id]; 
                                      return next; 
                                    }); 
                                  } 
                                }} 
                                error={errorMsg} 
                              /> 
                            )} 
 
                            {field.type === 'email' && ( 
                              <Input 
                                type="email" 
                                label={labelWithReq} 
                                placeholder={field.placeholder || "name@company.com"} 
                                required={field.required} 
                                name={field.id} 
                                value={previewFormValues[field.id] || ''} 
                                onChange={(e) => { 
                                  setPreviewFormValues(prev => ({ ...prev, [field.id]: e.target.value })); 
                                  if (previewErrors[field.id]) { 
                                    setPreviewErrors(prev => { 
                                      const next = { ...prev }; 
                                      delete next[field.id]; 
                                      return next; 
                                    }); 
                                  } 
                                }} 
                                error={errorMsg} 
                              /> 
                            )} 
 
                            {field.type === 'number' && ( 
                              <Input 
                                type="number" 
                                label={labelWithReq} 
                                placeholder={field.placeholder || "Enter numeric count..."} 
                                required={field.required} 
                                name={field.id} 
                                value={previewFormValues[field.id] || ''} 
                                onChange={(e) => { 
                                  setPreviewFormValues(prev => ({ ...prev, [field.id]: e.target.value })); 
                                  if (previewErrors[field.id]) { 
                                    setPreviewErrors(prev => { 
                                      const next = { ...prev }; 
                                      delete next[field.id]; 
                                      return next; 
                                    }); 
                                  } 
                                }} 
                                error={errorMsg} 
                              /> 
                            )} 
 
                            {field.type === 'textarea' && ( 
                              <Textarea 
                                label={labelWithReq} 
                                placeholder={field.placeholder || "Write answers here..."} 
                                required={field.required} 
                                name={field.id} 
                                value={previewFormValues[field.id] || ''} 
                                onChange={(e) => { 
                                  setPreviewFormValues(prev => ({ ...prev, [field.id]: e.target.value })); 
                                  if (previewErrors[field.id]) { 
                                    setPreviewErrors(prev => { 
                                      const next = { ...prev }; 
                                      delete next[field.id]; 
                                      return next; 
                                    }); 
                                  } 
                                }} 
                                error={errorMsg} 
                              /> 
                            )} 
 
                            {field.type === 'select' && ( 
                              <Select 
                                label={labelWithReq} 
                                required={field.required} 
                                name={field.id} 
                                value={previewFormValues[field.id] || ''} 
                                onChange={(e) => { 
                                  setPreviewFormValues(prev => ({ ...prev, [field.id]: e.target.value })); 
                                  if (previewErrors[field.id]) { 
                                    setPreviewErrors(prev => { 
                                      const next = { ...prev }; 
                                      delete next[field.id]; 
                                      return next; 
                                    }); 
                                  } 
                                }} 
                                error={errorMsg} 
                              > 
                                <option value="" className="bg-zinc-900 text-zinc-500">Pick 
Option</option> 
                                {field.options?.map((opt, i) => ( 
                                  <option key={i} value={opt} className="bg-zinc-900 text-zinc-100"> 
                                    {opt} 
                                  </option> 
                                ))} 
                              </Select> 
                            )} 
 
                            {field.type === 'checkbox' && ( 
                              <div className="space-y-1.5 py-1"> 
                                <span className="text-[11px] font-semibold uppercase tracking-wider 
text-zinc-400 select-none block"> 
                                  {labelWithReq} 
                                </span> 
                                <div className="flex flex-col gap-2 pt-1 border border-white/5 bg-zinc
900/40 p-3 rounded-xl"> 
                                  {field.options?.map((opt, i) => ( 
                                    <Checkbox 
                                      key={i} 
                                      label={opt} 
                                      name={`${field.id}-${i}`} 
                                      checked={!!previewFormValues[field.id]?.[opt]} 
                                      onChange={(e) => { 
                                        const checked = e.target.checked; 
                                        setPreviewFormValues(prev => { 
                                          const prevChecks = { ...(prev[field.id] || {}) }; 
                                          if (checked) { 
                                            prevChecks[opt] = true; 
                                          } else { 
                                            prevChecks[opt] = false; 
                                          } 
                                          return { ...prev, [field.id]: prevChecks }; 
                                        }); 
                                        if (previewErrors[field.id]) { 
                                          setPreviewErrors(prev => { 
                                            const next = { ...prev }; 
                                            delete next[field.id]; 
                                            return next; 
                                          }); 
                                        } 
                                      }} 
                                    /> 
                                  ))} 
                                </div> 
                                {errorMsg && ( 
                                  <span className="text-[11px] font-medium text-rose-400 block mt
1">{errorMsg}</span> 
                                )} 
                              </div> 
                            )} 
 
                            {field.type === 'radio' && ( 
                              <div className="space-y-1.5 py-1"> 
                                <span className="text-[11px] font-semibold uppercase tracking-wider 
text-zinc-400 select-none block"> 
                                  {labelWithReq} 
                                </span> 
                                <div className="flex flex-col gap-2 pt-1 border border-white/5 bg-zinc
900/40 p-3 rounded-xl"> 
                                  {field.options?.map((opt, i) => ( 
                                    <Radio 
                                      key={i} 
                                      label={opt} 
                                      name={field.id} 
                                      value={opt} 
                                      checked={previewFormValues[field.id] === opt} 
                                      onChange={() => { 
                                        setPreviewFormValues(prev => ({ ...prev, [field.id]: opt })); 
                                        if (previewErrors[field.id]) { 
                                          setPreviewErrors(prev => { 
                                            const next = { ...prev }; 
                                            delete next[field.id]; 
                                            return next; 
                                          }); 
                                        } 
                                      }} 
                                    /> 
                                  ))} 
                                </div> 
                                {errorMsg && ( 
                                  <span className="text-[11px] font-medium text-rose-400 block mt
1">{errorMsg}</span> 
                                )} 
                              </div> 
                            )} 
                          </div> 
                        ); 
                      }) 
                    )} 
 
                    {fields.length > 0 && ( 
                      <div className="pt-4.5 border-t border-white/5 flex justify-end gap-3"> 
                        <Button  
                          variant="ghost"  
                          type="button"  
                          onClick={() => { 
                            const cleared: Record<string, any> = {}; 
                            fields.forEach((f) => { 
                              cleared[f.id] = f.type === 'checkbox' ? {} : ''; 
                            }); 
                            setPreviewFormValues(cleared); 
                            setPreviewErrors({}); 
                            showToast("Simulated form entries reset!", "info"); 
                          }} 
                          className="text-xs h-9" 
                        > 
                          Reset Fields 
                        </Button> 
                        <Button variant="primary" type="submit" className="text-white text-xs h-9 
font-bold px-4"> 
                          Ingest Response Session 
                        </Button> 
                      </div> 
                    )} 
                  </form> 
                )} 
              </Card> 
            </div> 
          </div> 
 
            {/* RIGHT COLUMN: RAW API GATEWAY STREAMING FEED OBSERVATORY */} 
            <div className="lg:col-span-5 space-y-4"> 
              <div className="border border-white/10 bg-zinc-950/70 rounded-2xl p-5 premium
shadow space-y-4"> 
                <div className="flex items-center justify-between border-b border-white/5 pb-3"> 
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking
widest flex items-center gap-1.5"> 
                    <Database className="h-3.5 w-3.5" /> 
                    AWS Gateway REST Payload 
                  </span> 
                  <Badge variant="success" className="bg-[#10b981]/10 text-emerald-400 border 
border-emerald-400/20 text-[9px] font-bold px-1.5"> 
                    Streaming Active 
                  </Badge> 
                </div> 
 
                <p className="text-[11px] text-zinc-400 leading-normal"> 
                  Our sandbox models exact serverless telemetry format. The interactive JSON view 
below serializes client responses dynamically on every typing input: 
                </p> 
 
                <div className="relative"> 
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-zinc-500 font
bold tracking-widest uppercase bg-white/5 px-2 py-0.5 rounded"> 
                    POST: SUBMIT 
                  </div> 
                  <pre className="p-4 rounded-xl border border-white/5 bg-zinc-950 text-[11px] 
font-mono overflow-auto max-h-[290px] text-emerald-400 leading-relaxed scrollbar-thin 
text-left"> 
                    {JSON.stringify( 
                      { 
                        metadata: { 
                          event_source: "formflow.client.sandbox", 
                          ingest_endpoint: "https://api.formflow.aws/v2/entrypoint", 
                          origin_browser: "Simulator (Chrome V118)", 
                          payload_bytes: JSON.stringify(previewFormValues).length + 84, 
                          rendered_theme: previewTheme 
                        }, 
                        timestamp: new Date().toISOString(), 
                        schema_reference_id: formTitle.toLowerCase().replace(/[^a-z0-9]/g, '_') + 
"_form", 
                        form_responses: (() => { 
                          const result: Record<string, any> = {}; 
                          fields.forEach(field => { 
                            if (field.type === 'checkbox') { 
                              const checkedList: string[] = []; 
                              const selections = previewFormValues[field.id] || {}; 
                              Object.entries(selections).forEach(([opt, val]) => { 
                                if (val) checkedList.push(opt); 
                              }); 
                              result[field.id] = { 
                                label: field.label, 
                                value: checkedList.length > 0 ? checkedList : undefined 
                              }; 
                            } else { 
                              result[field.id] = { 
                                label: field.label, 
                                value: previewFormValues[field.id] || undefined 
                              }; 
                            } 
                          }); 
                          return result; 
                        })() 
                      }, 
                      null, 
                      2 
                    )} 
                  </pre> 
                </div> 
 
                <div className="grid grid-cols-2 gap-2 text-center text-zinc-400"> 
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5"> 
                    <span className="block text-[9px] uppercase tracking-wider text-zinc-500 font
bold font-display">Ingestable Keys</span> 
                    <span className="text-sm font-semibold text-zinc-100 font-mono"> 
                      {fields.length} Object Field{fields.length === 1 ? '' : 's'} 
                    </span> 
                  </div> 
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5"> 
                    <span className="block text-[9px] uppercase tracking-wider text-zinc-500 font
bold font-display">Client Validation</span> 
                    <span className={cn( 
                      "text-sm font-semibold font-mono flex items-center justify-center gap-1.5", 
                      Object.keys(previewErrors).length > 0 ? "text-rose-400" : "text-emerald-400" 
                    )}> 
                      {Object.keys(previewErrors).length > 0 ? 'Fix Errors' : 'Healthy Check'} 
                    </span> 
                  </div> 
                </div> 
              </div> 
            </div> 
 
          </div> 
 
          <div className="pt-4 border-t border-white/5 flex justify-end gap-2"> 
            <Button variant="primary" className="bg-zinc-800 hover:bg-zinc-700 text-xs px-4" 
onClick={() => setIsPreviewModalOpen(false)}> 
              Back to Builder Workspace 
            </Button> 
          </div> 
        </div> 
      </Modal> 
 
      {/* MODAL: LIVE FORM JSON ROUTING SCHEMA */} 
      <Modal 
        isOpen={isSchemaExportModalOpen} 
        onClose={() => setIsSchemaExportModalOpen(false)} 
        title={`Compiled SAM Webhook JSON Schema`} 
        size="lg" 
      > 
        <div className="space-y-5 text-left text-zinc-300"> 
          <p className="text-xs text-zinc-400 leading-normal"> 
            Every form created in FormFlow compiles into a secure, serverless cloud schema 
configuration. You can host this compiled schema as a direct JSON endpoint, paste it into 
your serverless AWS SAM template, or route submission events directly to API Gateway. 
          </p> 
 
          <div className="space-y-2"> 
            <div className="flex items-center justify-between"> 
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest 
flex items-center gap-1.5"> 
                <Database className="h-4 w-4" /> 
                Live Compiled JSON Output 
              </span> 
              <Button 
                variant="secondary" 
                onClick={() => { 
                  const compiled = { 
                    form_id: formTitle.toLowerCase().replace(/[^a-z0-9]/g, '_') + "_form", 
                    title: formTitle, 
                    description: formDescription, 
                    version: "2026-06-22", 
                    gateway_routing: "https://api-gateway.us-east
1.amazonaws.com/deploy/v3/submissions", 
                    persistence_target: "Amazon DynamoDB (Secure Encrypted Cluster)", 
                    schema: fields.map(field => ({ 
                      id: field.id, 
                      label: field.label, 
                      type: field.type, 
                      required: field.required, 
                      options: field.options || null, 
                      placeholder: field.placeholder || null 
                    })) 
                  }; 
                  navigator.clipboard.writeText(JSON.stringify(compiled, null, 2)); 
                  showToast("JSON Schema copied to clipboard!", "success"); 
                }} 
                className="h-8 px-2.5 text-xs bg-white/5 hover:bg-white/10" 
              > 
                <Copy className="h-3.5 w-3.5 mr-1" /> 
                Copy JSON 
              </Button> 
            </div> 
 
            <div className="relative"> 
              <pre className="p-4 rounded-xl border border-white/5 bg-zinc-950/90 text-[11px] 
font-mono overflow-auto max-h-[280px] text-emerald-400/90 leading-relaxed scrollbar
thin"> 
                {JSON.stringify({ 
                  form_id: formTitle.toLowerCase().replace(/[^a-z0-9]/g, '_') + "_form", 
                  title: formTitle, 
                  description: formDescription, 
                  version: "2026-06-22", 
                  gateway_routing: "https://api-gateway.us-east
1.amazonaws.com/deploy/v3/submissions", 
                  persistence_target: "Amazon DynamoDB (Secure Encrypted Cluster)", 
                  schema: fields.map(field => ({ 
                    id: field.id, 
                    label: field.label, 
                    type: field.type, 
                    required: field.required, 
                    options: field.options || undefined, 
                    placeholder: field.placeholder || undefined 
                  })) 
                }, null, 2)} 
              </pre> 
            </div> 
          </div> 
 
          <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10 space
y-1.5"> 
            <p className="text-xs font-semibold text-zinc-200">Where does form data go upon 
click?</p> 
            <p className="text-[11.5px] text-zinc-400 leading-relaxed"> 
              When a user submits, their answers are packaged as a JSON document and POSTed 
to the <strong className="text-zinc-200">gateway_routing</strong> endpoint. An AWS 
Lambda trigger automatically maps these structured answers as document attributes inside 
Amazon DynamoDB, safely storing them without needing self-managed servers. 
            </p> 
          </div> 
 
          <div className="pt-4 border-t border-white/5 flex justify-end"> 
            <Button variant="primary" className="bg-indigo-600 hover:bg-indigo-500 text-xs px
4 py-2" onClick={() => setIsSchemaExportModalOpen(false)}> 
              Got it, Close 
            </Button> 
          </div> 
        </div> 
      </Modal> 
 
      {/* Floating Modern Custom Toast Notification */} 
      <AnimatePresence> 
        {toast && ( 
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.9 }} 
            transition={{ duration: 0.2 }} 
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4.5 py-3.5 
rounded-2xl border border-white/10 bg-zinc-950/95 text-zinc-100 shadow-2xl backdrop
blur-xl max-w-sm font-sans" 
          > 
            <div className={cn( 
               "h-2 w-2 rounded-full shrink-0", 
               toast.type === 'success' ? "bg-emerald-500 shadow
[0_0_8px_rgba(16,185,129,0.6)]" : 
               toast.type === 'error' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" : 
               "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
            )} /> 
            <span className="text-xs font-semibold leading-snug">{toast.message}</span> 
            <button  
              onClick={() => setToast(null)} 
              className="ml-3 text-zinc-500 hover:text-zinc-200 text-xs font-bold transition-colors 
cursor-pointer" 
            > 
✕ 
</button> 
</motion.div> 
)} 
</AnimatePresence> 
</div> 
); 
}; 