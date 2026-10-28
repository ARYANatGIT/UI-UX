import React, { useState, useEffect, useId } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, Calendar, Users, Clock, Compass, Plus, Trash2, 
  ArrowUp, ArrowDown, Printer, Share2, Save, RotateCcw, 
  CheckCircle, AlertCircle, Sparkles, MapPin, ChevronRight, 
  Info, DollarSign, ShieldAlert 
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { DESTINATIONS, Destination } from '../data/destinations';
import './Plan.css';

interface PlanProps {
  plannerDestinations: Destination[];
  onAddDestination: (dest: Destination) => void;
  onRemoveDestination: (id: string) => void;
  onReorderDestinations: (destinations: Destination[]) => void;
  onTriggerToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const STORAGE_KEY = 'raahi_saved_itinerary_v1';

export const Plan: React.FC<PlanProps> = ({
  plannerDestinations,
  onAddDestination,
  onRemoveDestination,
  onReorderDestinations,
  onTriggerToast,
}) => {
  const [searchParams] = useSearchParams();

  // Step 1: Destination Selector search state
  const [destSearchQuery, setDestSearchQuery] = useState('');
  const [selectedDestIdToAdd, setSelectedDestIdToAdd] = useState('');

  // Step 2: Preferences State
  // Today's date string in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(todayStr);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [durationDays, setDurationDays] = useState<number>(5);
  const [travelStyle, setTravelStyle] = useState<'Backpacker' | 'Mindful Wanderer' | 'Heritage & Comfort' | 'Boutique Explorer'>('Mindful Wanderer');
  
  // Custom Notes per destination
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});

  // Validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Confirmation modal for resetting
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Active step in the workflow UI
  const [activeStep, setActiveStep] = useState<number>(1);

  // Initialize from URL param if available (e.g., /plan?add=jaipur)
  useEffect(() => {
    const addSlug = searchParams.get('add');
    if (addSlug) {
      const match = DESTINATIONS.find(d => d.id === addSlug || d.slug === addSlug);
      if (match && !plannerDestinations.some(d => d.id === match.id)) {
        onAddDestination(match);
        onTriggerToast(`Added ${match.name} to your itinerary!`, 'success');
      }
    }
  }, [searchParams]);

  // Check and restore saved itinerary from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.startDate) setStartDate(parsed.startDate);
        if (parsed.travelersCount) setTravelersCount(parsed.travelersCount);
        if (parsed.durationDays) setDurationDays(parsed.durationDays);
        if (parsed.travelStyle) setTravelStyle(parsed.travelStyle);
        if (parsed.customNotes) setCustomNotes(parsed.customNotes);
        
        // If parent destinations list is empty, restore saved destination IDs
        if (plannerDestinations.length === 0 && Array.isArray(parsed.destinationIds)) {
          const restored = DESTINATIONS.filter(d => parsed.destinationIds.includes(d.id));
          if (restored.length > 0) {
            onReorderDestinations(restored);
            onTriggerToast('Restored your previously saved itinerary draft.', 'info');
          }
        }
      }
    } catch (e) {
      // localStorage unavailable or disabled
    }
  }, []);

  // Filter available destinations for Step 1
  const availableToAdd = DESTINATIONS.filter(d => 
    !plannerDestinations.some(pd => pd.id === d.id) &&
    (destSearchQuery.trim() === '' || 
      d.name.toLowerCase().includes(destSearchQuery.toLowerCase()) || 
      d.state.toLowerCase().includes(destSearchQuery.toLowerCase()))
  );

  const handleAddSelectedDestination = (dest: Destination) => {
    if (plannerDestinations.some(d => d.id === dest.id)) {
      onTriggerToast(`${dest.name} is already in your itinerary.`, 'info');
      return;
    }
    onAddDestination(dest);
    onTriggerToast(`Added ${dest.name} to your itinerary.`, 'success');
    setDestSearchQuery('');
  };

  // Reorder destination in list
  const moveDestination = (index: number, direction: 'up' | 'down') => {
    const newItems = [...plannerDestinations];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    onReorderDestinations(newItems);
  };

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (plannerDestinations.length === 0) {
      errors.destinations = 'Please add at least one destination to build your itinerary.';
    }

    if (!startDate) {
      errors.startDate = 'Please choose an indicative start date.';
    } else {
      const selected = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errors.startDate = 'Start date cannot be in the past.';
      }
    }

    if (durationDays < 1 || durationDays > 30) {
      errors.durationDays = 'Please select a duration between 1 and 30 days.';
    }

    if (travelersCount < 1 || travelersCount > 15) {
      errors.travelersCount = 'Travelers must be between 1 and 15.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save to localStorage
  const handleSaveDraft = () => {
    if (!validateForm()) {
      onTriggerToast('Please address form validation notes before saving.', 'error');
      return;
    }
    try {
      const payload = {
        destinationIds: plannerDestinations.map(d => d.id),
        startDate,
        travelersCount,
        durationDays,
        travelStyle,
        customNotes,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      onTriggerToast('Itinerary saved to your browser storage!', 'success');
    } catch (e) {
      onTriggerToast('Could not access browser storage. Private browsing may be active.', 'error');
    }
  };

  // Reset Plan
  const handleResetConfirm = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    onReorderDestinations([]);
    setCustomNotes({});
    setTravelersCount(2);
    setDurationDays(5);
    setTravelStyle('Mindful Wanderer');
    setShowResetConfirm(false);
    onTriggerToast('Itinerary draft has been reset.', 'info');
  };

  // Share or copy link
  const handleShare = async () => {
    const destIds = plannerDestinations.map(d => d.id).join(',');
    const shareUrl = `${window.location.origin}/plan?destinations=${encodeURIComponent(destIds)}&days=${durationDays}&style=${encodeURIComponent(travelStyle)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Raahi India Itinerary',
          text: `Check out my ${durationDays}-day travel plan across India for ${plannerDestinations.map(d => d.name).join(', ')}!`,
          url: shareUrl
        });
        return;
      } catch (err) {}
    }

    navigator.clipboard.writeText(shareUrl);
    onTriggerToast('Shareable link copied to clipboard!', 'success');
  };

  // Print Dossier
  const handlePrint = () => {
    window.print();
  };

  // Indicative cost calculation multiplier based on travel style
  const styleMultipliers: Record<string, number> = {
    'Backpacker': 0.75,
    'Mindful Wanderer': 1.0,
    'Heritage & Comfort': 1.6,
    'Boutique Explorer': 2.4
  };

  const baseDailyCost = plannerDestinations.length > 0
    ? Math.round(plannerDestinations.reduce((acc, d) => acc + d.indicativeDailyCost, 0) / plannerDestinations.length)
    : 2200;

  const estimatedTotalCost = Math.round(
    baseDailyCost * (styleMultipliers[travelStyle] || 1.0) * durationDays * travelersCount
  );

  return (
    <>
      <SEOHead
        title="Plan Your India Trip | Raahi Itinerary Builder"
        description="Craft a personalized, day-by-day travel itinerary across India. Choose destinations, customize pace, calculate indicative costs, and save offline."
        canonicalPath="/plan"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Raahi Trip Itinerary Planner",
          "applicationCategory": "TravelApplication",
          "operatingSystem": "All modern browsers",
          "description": "Interactive client-side trip planner for discovering and sequencing Indian destinations.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          }
        }}
      />

      <main id="main-content" className="plan-page">
        {/* Printable Only Header */}
        <div className="print-only print-header">
          <h1>RAAHI — Personalized India Travel Dossier</h1>
          <p>Discover India Differently • Custom Curated Itinerary</p>
          <p>Date Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <hr />
        </div>

        {/* Page Banner Header */}
        <section className="plan-hero no-print" aria-labelledby="planner-heading">
          <div className="container">
            <span className="badge badge-sand">Interactive Journey Builder</span>
            <h1 id="planner-heading" className="plan-hero-title">
              Plan your personalized journey.
            </h1>
            <p className="plan-hero-desc">
              Design a custom day-by-day itinerary. Sequence your chosen destinations, set travel preferences, review indicative budget breakdowns, and export a clean print dossier.
            </p>

            {/* Stepper Navigation */}
            <nav className="planner-stepper" aria-label="Planner Progress Steps">
              <button 
                type="button" 
                onClick={() => setActiveStep(1)} 
                className={`step-btn ${activeStep === 1 ? 'step-btn--active' : ''}`}
              >
                <span className="step-num">1</span>
                <span>Destinations ({plannerDestinations.length})</span>
              </button>
              <span className="step-divider" aria-hidden="true">→</span>
              <button 
                type="button" 
                onClick={() => setActiveStep(2)} 
                className={`step-btn ${activeStep === 2 ? 'step-btn--active' : ''}`}
              >
                <span className="step-num">2</span>
                <span>Preferences</span>
              </button>
              <span className="step-divider" aria-hidden="true">→</span>
              <button 
                type="button" 
                onClick={() => setActiveStep(3)} 
                className={`step-btn ${activeStep === 3 ? 'step-btn--active' : ''}`}
              >
                <span className="step-num">3</span>
                <span>Review Itinerary</span>
              </button>
            </nav>
          </div>
        </section>

        <div className="container plan-content-grid">
          {/* LEFT COLUMN: BUILDER WORKFLOW */}
          <div className="plan-builder-column">
            {/* STEP 1: CHOOSE DESTINATIONS */}
            <section className="plan-card no-print" aria-labelledby="step1-heading">
              <div className="plan-card-header">
                <span className="card-step-badge">Step 1</span>
                <div>
                  <h2 id="step1-heading" className="card-step-title">Select Destinations</h2>
                  <p className="card-step-sub">Add places you wish to visit on this trip from our catalog.</p>
                </div>
              </div>

              {/* Destination Search & Add Box */}
              <div className="dest-search-add-box">
                <div className="dest-input-wrap">
                  <label htmlFor="dest-picker-input" className="sr-only">Search destinations to add</label>
                  <Search size={18} className="dest-search-icon" aria-hidden="true" />
                  <input
                    id="dest-picker-input"
                    type="search"
                    placeholder="Search destination to add (e.g. Jaipur, Munnar)..."
                    value={destSearchQuery}
                    onChange={(e) => setDestSearchQuery(e.target.value)}
                    className="dest-picker-input"
                  />
                </div>

                {/* Search Quick Dropdown */}
                {destSearchQuery.trim() && (
                  <div className="dest-quick-dropdown" role="listbox" aria-label="Available destinations">
                    {availableToAdd.length > 0 ? (
                      availableToAdd.slice(0, 5).map((dest) => (
                        <button
                          key={dest.id}
                          type="button"
                          className="dest-quick-item"
                          onClick={() => handleAddSelectedDestination(dest)}
                        >
                          <MapPin size={15} className="quick-pin" aria-hidden="true" />
                          <div className="quick-info">
                            <strong>{dest.name}</strong>
                            <span>{dest.state} • {dest.category}</span>
                          </div>
                          <span className="quick-add-btn">
                            <Plus size={14} aria-hidden="true" /> Add
                          </span>
                        </button>
                      ))
                    ) : (
                      <p className="quick-empty">No unadded destinations match "{destSearchQuery}"</p>
                    )}
                  </div>
                )}
              </div>

              {/* Current Destination Chips */}
              <div className="selected-destinations-area">
                <span className="selected-area-label">
                  Current Stops in Itinerary ({plannerDestinations.length}):
                </span>

                {plannerDestinations.length > 0 ? (
                  <div className="dest-chips-list">
                    {plannerDestinations.map((dest, idx) => (
                      <div key={dest.id} className="dest-chip">
                        <span className="dest-chip-order">{idx + 1}</span>
                        <span className="dest-chip-name">{dest.name}</span>
                        <span className="dest-chip-state">({dest.state})</span>
                        
                        <div className="dest-chip-controls">
                          <button
                            type="button"
                            onClick={() => moveDestination(idx, 'up')}
                            disabled={idx === 0}
                            className="chip-btn"
                            aria-label={`Move ${dest.name} earlier in itinerary`}
                            title="Move earlier"
                          >
                            <ArrowUp size={13} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveDestination(idx, 'down')}
                            disabled={idx === plannerDestinations.length - 1}
                            className="chip-btn"
                            aria-label={`Move ${dest.name} later in itinerary`}
                            title="Move later"
                          >
                            <ArrowDown size={13} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onRemoveDestination(dest.id);
                              onTriggerToast(`Removed ${dest.name} from itinerary.`, 'info');
                            }}
                            className="chip-btn chip-btn--remove"
                            aria-label={`Remove ${dest.name} from itinerary`}
                            title="Remove stop"
                          >
                            <Trash2 size={13} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="dest-empty-notice">
                    <Compass size={24} className="notice-icon" aria-hidden="true" />
                    <p>No destinations selected yet. Use the search field above or browse the Explore catalog to add stops.</p>
                  </div>
                )}

                {formErrors.destinations && (
                  <p className="form-error" role="alert">
                    <AlertCircle size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> {formErrors.destinations}
                  </p>
                )}
              </div>
            </section>

            {/* STEP 2: PREFERENCES FORM */}
            <section className="plan-card no-print" aria-labelledby="step2-heading">
              <div className="plan-card-header">
                <span className="card-step-badge">Step 2</span>
                <div>
                  <h2 id="step2-heading" className="card-step-title">Trip Preferences</h2>
                  <p className="card-step-sub">Customize trip timing, party size, and travel style.</p>
                </div>
              </div>

              <div className="preferences-form-grid">
                {/* Start Date */}
                <div className="form-group">
                  <label htmlFor="pref-start-date" className="form-label">
                    Indicative Start Date
                  </label>
                  <input
                    id="pref-start-date"
                    type="date"
                    value={startDate}
                    min={todayStr}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-input"
                  />
                  {formErrors.startDate && (
                    <p className="form-error">{formErrors.startDate}</p>
                  )}
                </div>

                {/* Duration */}
                <div className="form-group">
                  <label htmlFor="pref-duration" className="form-label">
                    Trip Duration (Days)
                  </label>
                  <input
                    id="pref-duration"
                    type="number"
                    min="1"
                    max="30"
                    value={durationDays}
                    onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)}
                    className="form-input"
                  />
                  {formErrors.durationDays && (
                    <p className="form-error">{formErrors.durationDays}</p>
                  )}
                </div>

                {/* Travelers Count */}
                <div className="form-group">
                  <label htmlFor="pref-travelers" className="form-label">
                    Number of Travelers
                  </label>
                  <input
                    id="pref-travelers"
                    type="number"
                    min="1"
                    max="15"
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                    className="form-input"
                  />
                  {formErrors.travelersCount && (
                    <p className="form-error">{formErrors.travelersCount}</p>
                  )}
                </div>

                {/* Travel Style */}
                <div className="form-group">
                  <label htmlFor="pref-style" className="form-label">
                    Travel Style & Comfort Tier
                  </label>
                  <select
                    id="pref-style"
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="Backpacker">Backpacker (Hostels & Local Transit)</option>
                    <option value="Mindful Wanderer">Mindful Wanderer (Boutique Homestays & Regional Trains)</option>
                    <option value="Heritage & Comfort">Heritage & Comfort (Historic Havelis & Private Cabs)</option>
                    <option value="Boutique Explorer">Boutique Explorer (Luxury Palaces & Private Chauffeurs)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* STEP 3: VISUAL DAY-BY-DAY ITINERARY REVIEW */}
            <section className="plan-card print-break-inside-avoid" aria-labelledby="step3-heading">
              <div className="plan-card-header">
                <span className="card-step-badge">Step 3</span>
                <div>
                  <h2 id="step3-heading" className="card-step-title">Day-by-Day Itinerary Plan</h2>
                  <p className="card-step-sub">
                    Illustrative itinerary schedule based on your selected stops and duration.
                  </p>
                </div>
              </div>

              {plannerDestinations.length > 0 ? (
                <div className="day-schedule-timeline">
                  {Array.from({ length: durationDays }).map((_, dayIdx) => {
                    const dayNum = dayIdx + 1;
                    // Distribute destinations proportionally across the available days
                    const destIndex = Math.min(
                      Math.floor((dayIdx / durationDays) * plannerDestinations.length),
                      plannerDestinations.length - 1
                    );
                    const currentDest = plannerDestinations[destIndex];

                    // Date calculation
                    const dateObj = new Date(startDate || todayStr);
                    dateObj.setDate(dateObj.getDate() + dayIdx);
                    const formattedDate = dateObj.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    });

                    return (
                      <div key={dayNum} className="timeline-day-card">
                        <div className="timeline-day-badge">
                          <span className="badge-day-label">Day {dayNum}</span>
                          <span className="badge-date-label">{formattedDate}</span>
                        </div>

                        <div className="timeline-day-details">
                          <div className="timeline-dest-header">
                            <MapPin size={16} className="timeline-pin" aria-hidden="true" />
                            <h3 className="timeline-dest-title">
                              Exploring {currentDest.name}, {currentDest.state}
                            </h3>
                            <span className="timeline-category-tag">{currentDest.category}</span>
                          </div>

                          <p className="timeline-dest-desc">
                            {currentDest.shortDescription}
                          </p>

                          {/* Highlights Suggestions */}
                          <div className="timeline-highlights">
                            <strong>Suggested Focus:</strong>
                            <ul className="timeline-focus-list">
                              {currentDest.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Note input for this day */}
                          <div className="timeline-notes-box no-print">
                            <label htmlFor={`note-day-${dayNum}`} className="notes-label">
                              Personal Day Notes (Optional):
                            </label>
                            <input
                              id={`note-day-${dayNum}`}
                              type="text"
                              placeholder="e.g. Wake up early for photography, meet local guide..."
                              value={customNotes[`day-${dayNum}`] || ''}
                              onChange={(e) => setCustomNotes({
                                ...customNotes,
                                [`day-${dayNum}`]: e.target.value
                              })}
                              className="notes-input"
                            />
                          </div>

                          {/* Print view of personal notes */}
                          {customNotes[`day-${dayNum}`] && (
                            <p className="print-only" style={{ fontStyle: 'italic', marginTop: '6px' }}>
                              Notes: {customNotes[`day-${dayNum}`]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="timeline-empty-notice">
                  <p>Add at least one destination above to generate your customized day-by-day plan.</p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN: INDICATIVE BUDGET & ACTIONS */}
          <aside className="plan-summary-column" aria-label="Trip Summary & Actions">
            <div className="summary-sticky-card">
              <h2 className="summary-title">Journey Summary</h2>

              {/* Metric Breakdown */}
              <div className="summary-metrics">
                <div className="metric-row">
                  <span className="metric-label">Destinations</span>
                  <span className="metric-val">{plannerDestinations.length} stops</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Duration</span>
                  <span className="metric-val">{durationDays} days</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Travelers</span>
                  <span className="metric-val">{travelersCount} persons</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Travel Style</span>
                  <span className="metric-val">{travelStyle}</span>
                </div>
              </div>

              {/* Indicative Budget Box */}
              <div className="budget-calculation-box">
                <div className="budget-header">
                  <DollarSign size={16} className="budget-icon" aria-hidden="true" />
                  <span className="budget-title">Indicative Budget Estimate</span>
                </div>
                <div className="budget-price-display">
                  <span className="currency-symbol">₹</span>
                  <span className="budget-amount">{estimatedTotalCost.toLocaleString('en-IN')}</span>
                  <span className="budget-sub-label">total estimated</span>
                </div>
                <p className="budget-per-person">
                  ≈ ₹{Math.round(estimatedTotalCost / travelersCount).toLocaleString('en-IN')} per person
                </p>
                <div className="budget-disclaimer">
                  <Info size={14} className="disclaimer-info" aria-hidden="true" />
                  <span>
                    Illustrative baseline for journey planning. Actual expenses vary with season, transit bookings, and lodging choices.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="summary-actions-list no-print">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="btn btn-primary btn-full"
                >
                  <Save size={16} aria-hidden="true" />
                  <span>Save Draft in Browser</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-secondary btn-full"
                  disabled={plannerDestinations.length === 0}
                >
                  <Printer size={16} aria-hidden="true" />
                  <span>Print Dossier (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn btn-ghost btn-full"
                  disabled={plannerDestinations.length === 0}
                >
                  <Share2 size={16} aria-hidden="true" />
                  <span>Share Itinerary Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="btn-reset-link"
                >
                  <RotateCcw size={13} aria-hidden="true" />
                  <span>Reset All Selections</span>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Reset Confirmation Dialog Modal */}
        {showResetConfirm && (
          <div className="reset-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="reset-modal-title">
            <div className="reset-modal-card">
              <div className="reset-modal-header">
                <ShieldAlert size={24} className="reset-modal-icon" aria-hidden="true" />
                <h3 id="reset-modal-title">Reset Itinerary Draft?</h3>
              </div>
              <p className="reset-modal-body">
                This will clear all selected destinations, preferences, and custom notes from this device. Are you sure you wish to start over?
              </p>
              <div className="reset-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetConfirm}
                  className="btn btn-terracotta btn-sm"
                >
                  Yes, Reset Draft
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
