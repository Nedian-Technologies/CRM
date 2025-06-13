import React, { useState } from 'react';
import {
  Target,
  Plus,
  DollarSign,
  Calendar,
  User,
  Building,
  Edit,
  Trash2,
  X,
  Save,
  ChevronRight,
  GripVertical
} from 'lucide-react';

interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  contact: string;
  description: string;
  createdAt: string;
}

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 1,
      title: 'Enterprise Software License',
      company: 'Acme Corp',
      value: 12500,
      stage: 'proposal',
      probability: 80,
      expectedCloseDate: '2024-02-15',
      contact: 'Sarah Johnson',
      description: 'Annual enterprise software licensing deal with potential for 3-year contract.',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'Cloud Migration Project',
      company: 'Tech Solutions',
      value: 8200,
      stage: 'negotiation',
      probability: 65,
      expectedCloseDate: '2024-02-28',
      contact: 'Michael Chen',
      description: 'Complete cloud infrastructure migration and setup services.',
      createdAt: '2024-01-05'
    },
    {
      id: 3,
      title: 'Digital Transformation',
      company: 'Global Inc',
      value: 25000,
      stage: 'qualified',
      probability: 45,
      expectedCloseDate: '2024-03-15',
      contact: 'Emily Rodriguez',
      description: 'Full digital transformation project including process automation.',
      createdAt: '2024-01-20'
    },
    {
      id: 4,
      title: 'Marketing Automation Setup',
      company: 'StartupXYZ',
      value: 5500,
      stage: 'lead',
      probability: 25,
      expectedCloseDate: '2024-03-30',
      contact: 'Alex Thompson',
      description: 'Implementation of marketing automation tools and workflows.',
      createdAt: '2024-01-25'
    },
    {
      id: 5,
      title: 'Data Analytics Platform',
      company: 'Enterprise Corp',
      value: 18000,
      stage: 'proposal',
      probability: 70,
      expectedCloseDate: '2024-02-20',
      contact: 'Lisa Wang',
      description: 'Custom data analytics platform with real-time reporting capabilities.',
      createdAt: '2024-01-15'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    value: '',
    stage: 'lead' as Deal['stage'],
    probability: 25,
    expectedCloseDate: '',
    contact: '',
    description: ''
  });

  const stages = [
    { id: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-800' },
    { id: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-800' },
    { id: 'proposal', label: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
    { id: 'closed-won', label: 'Closed Won', color: 'bg-green-100 text-green-800' },
    { id: 'closed-lost', label: 'Closed Lost', color: 'bg-red-100 text-red-800' }
  ];

  const handleDragStart = (e: React.DragEvent, deal: Deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.style.opacity = '1';
    setDraggedDeal(null);
    setDragOverStage(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOverStage(stageId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only clear drag over state if we're leaving the stage container entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverStage(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    setDragOverStage(null);
    
    if (draggedDeal && draggedDeal.stage !== targetStage) {
      // Update probability based on stage
      let newProbability = draggedDeal.probability;
      switch (targetStage) {
        case 'lead':
          newProbability = 25;
          break;
        case 'qualified':
          newProbability = 45;
          break;
        case 'proposal':
          newProbability = 70;
          break;
        case 'negotiation':
          newProbability = 85;
          break;
        case 'closed-won':
          newProbability = 100;
          break;
        case 'closed-lost':
          newProbability = 0;
          break;
      }

      setDeals(deals.map(deal =>
        deal.id === draggedDeal.id
          ? { ...deal, stage: targetStage as Deal['stage'], probability: newProbability }
          : deal
      ));
    }
    setDraggedDeal(null);
  };

  const handleAddDeal = () => {
    if (formData.title && formData.company && formData.value) {
      const newDeal: Deal = {
        id: Date.now(),
        title: formData.title,
        company: formData.company,
        value: parseFloat(formData.value),
        stage: formData.stage,
        probability: formData.probability,
        expectedCloseDate: formData.expectedCloseDate,
        contact: formData.contact,
        description: formData.description,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setDeals([newDeal, ...deals]);
      closeModal();
    }
  };

  const handleEditDeal = () => {
    if (editingDeal && formData.title && formData.company && formData.value) {
      setDeals(deals.map(deal =>
        deal.id === editingDeal.id
          ? {
              ...deal,
              title: formData.title,
              company: formData.company,
              value: parseFloat(formData.value),
              stage: formData.stage,
              probability: formData.probability,
              expectedCloseDate: formData.expectedCloseDate,
              contact: formData.contact,
              description: formData.description
            }
          : deal
      ));
      closeModal();
    }
  };

  const handleDeleteDeal = (id: number) => {
    setDeals(deals.filter(deal => deal.id !== id));
  };

  const openEditModal = (deal: Deal) => {
    setEditingDeal(deal);
    setFormData({
      title: deal.title,
      company: deal.company,
      value: deal.value.toString(),
      stage: deal.stage,
      probability: deal.probability,
      expectedCloseDate: deal.expectedCloseDate,
      contact: deal.contact,
      description: deal.description
    });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingDeal(null);
    setFormData({
      title: '',
      company: '',
      value: '',
      stage: 'lead',
      probability: 25,
      expectedCloseDate: '',
      contact: '',
      description: ''
    });
  };

  const getStageColor = (stage: Deal['stage']) => {
    return stages.find(s => s.id === stage)?.color || 'bg-gray-100 text-gray-800';
  };

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
          <p className="text-gray-600 mt-1">Track and manage your sales pipeline</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Pipeline</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
          <p className="text-sm text-gray-600">{deals.length} active deals</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Weighted Pipeline</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">${weightedValue.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Based on probability</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Avg. Deal Size</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${deals.length > 0 ? (totalValue / deals.length).toLocaleString() : '0'}
          </p>
          <p className="text-sm text-gray-600">Per deal</p>
        </div>
      </div>

      {/* Drag and Drop Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <GripVertical className="w-5 h-5 text-blue-600" />
          <p className="text-blue-800 font-medium">Drag and drop deals between stages to update their status</p>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Sales Pipeline</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="flex min-w-max">
            {stages.map((stage, index) => {
              const stageDeals = deals.filter(deal => deal.stage === stage.id);
              const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
              const isDragOver = dragOverStage === stage.id;
              
              return (
                <div 
                  key={stage.id} 
                  className={`flex-1 min-w-80 border-r border-gray-200 last:border-r-0 transition-colors ${
                    isDragOver ? 'bg-blue-50' : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, stage.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, stage.id)}
                >
                  <div className={`p-4 border-b border-gray-200 transition-colors ${
                    isDragOver ? 'bg-blue-100' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${stage.color}`}>
                        {stage.label} ({stageDeals.length})
                      </span>
                      <span className="text-sm text-gray-600">
                        ${stageValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className={`p-4 space-y-3 min-h-96 transition-colors ${
                    isDragOver ? 'bg-blue-25' : ''
                  }`}>
                    {stageDeals.map(deal => (
                      <div 
                        key={deal.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal)}
                        onDragEnd={handleDragEnd}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-move group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-2 flex-1">
                            <GripVertical className="w-4 h-4 text-gray-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h4 className="font-medium text-gray-900 text-sm flex-1">{deal.title}</h4>
                          </div>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEditModal(deal)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteDeal(deal.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Building className="w-3 h-3" />
                            <span>{deal.company}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <User className="w-3 h-3" />
                            <span>{deal.contact}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <DollarSign className="w-3 h-3" />
                            <span>${deal.value.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Probability</span>
                            <span className="font-medium text-gray-900">{deal.probability}%</span>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full transition-all"
                              style={{ width: `${deal.probability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {stageDeals.length === 0 && (
                      <div className={`flex items-center justify-center h-32 text-gray-400 border-2 border-dashed rounded-lg transition-colors ${
                        isDragOver ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <p className="text-sm">
                          {isDragOver ? 'Drop deal here' : 'No deals in this stage'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingDeal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingDeal ? 'Edit Deal' : 'Add New Deal'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as Deal['stage'] })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {stages.map(stage => (
                      <option key={stage.id} value={stage.id}>{stage.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Probability ({formData.probability}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={formData.probability}
                    onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
                  <input
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingDeal ? handleEditDeal : handleAddDeal}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{editingDeal ? 'Update' : 'Add'} Deal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deals;