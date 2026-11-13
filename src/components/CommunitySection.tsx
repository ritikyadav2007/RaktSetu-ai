import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Share2, 
  Users, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Send,
  PlusCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BloodCamp, CommunityStory } from '../types';
import { MOCK_CAMPS, MOCK_STORIES, CITIES } from '../data/mockData';

export const CommunitySection: React.FC = () => {
  const [stories, setStories] = useState<CommunityStory[]>(MOCK_STORIES);
  const [camps, setCamps] = useState<BloodCamp[]>(MOCK_CAMPS);
  const [activeTab, setActiveTab] = useState<'stories' | 'camps'>('camps');

  // Comment input per story
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Camp registration modal
  const [registeredCampId, setRegisteredCampId] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState(false);

  // Organize Camp Modal
  const [organizeModalOpen, setOrganizeModalOpen] = useState(false);
  const [orgCollegeName, setOrgCollegeName] = useState('');
  const [orgContact, setOrgContact] = useState('');
  const [orgSuccess, setOrgSuccess] = useState(false);

  const handleLike = (storyId: string) => {
    setStories(prev => prev.map(s => {
      if (s.id === storyId) {
        const isLiked = s.userLiked;
        return {
          ...s,
          likes: isLiked ? s.likes - 1 : s.likes + 1,
          userLiked: !isLiked
        };
      }
      return s;
    }));
  };

  const handleAddComment = (storyId: string) => {
    const text = commentInputs[storyId];
    if (!text?.trim()) return;

    setStories(prev => prev.map(s => {
      if (s.id === storyId) {
        return {
          ...s,
          comments: [
            ...s.comments,
            {
              id: `c-${Date.now()}`,
              author: 'You (Verified Visitor)',
              comment: text.trim(),
              time: 'Just now'
            }
          ]
        };
      }
      return s;
    }));

    setCommentInputs({ ...commentInputs, [storyId]: '' });
  };

  const handleRegisterForCamp = (campId: string) => {
    setCamps(prev => prev.map(c => {
      if (c.id === campId) {
        return { ...c, registeredDonors: c.registeredDonors + 1 };
      }
      return c;
    }));
    setRegisteredCampId(campId);
    setRegSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setRegSuccess(false);
      setRegisteredCampId(null);
    }, 2500);
  };

  const handleOrganizeCampSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrgSuccess(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setOrgSuccess(false);
      setOrganizeModalOpen(false);
      setOrgCollegeName('');
      setOrgContact('');
    }, 2500);
  };

  return (
    <section id="community" className="py-12 bg-white min-h-screen border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wide">
                Community & Impact
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Drives, Camps & Life-Saving Stories
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Donation Camps & Community Stories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Join upcoming mobile blood drives or share your journey of giving and receiving life.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('camps')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'camps'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Blood Donation Camps
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'stories'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Donation Stories ({stories.length})
            </button>
          </div>
        </div>

        {/* TAB 1: UPCOMING BLOOD DONATION CAMPS */}
        {activeTab === 'camps' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-600" />
                <span className="text-xs font-bold text-slate-800">
                  Are you a College, Corporate Office, or Resident Welfare Association?
                </span>
              </div>
              <button
                onClick={() => setOrganizeModalOpen(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                + Organize a Camp with Us
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {camps.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-16/9 overflow-hidden bg-slate-900">
                      <img
                        src={camp.bannerImage}
                        alt={camp.title}
                        className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                        NBTC Approved
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[11px] font-bold bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {camp.date} • {camp.timing}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">
                        {camp.title}
                      </h3>
                      <p className="text-xs text-red-700 font-bold mb-2">
                        Organized by: {camp.organizer}
                      </p>

                      <div className="text-xs text-slate-600 flex items-start gap-1.5 mb-4">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{camp.venue}, {camp.city}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="bg-slate-100 rounded-xl p-3 mb-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Donors Registered</span>
                          <span className="text-red-700">{camp.registeredDonors} / {camp.targetUnits}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full transition-all"
                            style={{ width: `${Math.min(100, (camp.registeredDonors / camp.targetUnits) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleRegisterForCamp(camp.id)}
                      className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Register to Donate at this Camp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COMMUNITY STORIES & IMPACT */}
        {activeTab === 'stories' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-red-200 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {story.authorName}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {story.authorRole}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Posted on {story.date}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 bg-red-600 text-white font-black text-xs rounded-lg">
                    {story.bloodGroup}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">
                  "{story.title}"
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {story.story}
                </p>

                {/* Like & Comment counters */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-4 text-xs">
                  <button
                    onClick={() => handleLike(story.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                      story.userLiked ? 'text-red-600' : 'text-slate-600 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${story.userLiked ? 'fill-red-600 text-red-600' : ''}`} />
                    <span>{story.likes} Hearts</span>
                  </button>

                  <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <MessageCircle className="w-4 h-4" />
                    <span>{story.comments.length} Comments</span>
                  </span>
                </div>

                {/* Comments List */}
                {story.comments.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-3 space-y-2 text-xs">
                    {story.comments.map((c) => (
                      <div key={c.id} className="border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between text-[11px]">
                          <strong className="text-slate-800">{c.author}</strong>
                          <span className="text-slate-400">{c.time}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{c.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Field */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Write an encouraging comment..."
                    value={commentInputs[story.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [story.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(story.id);
                    }}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={() => handleAddComment(story.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ORGANIZE CAMP MODAL */}
        {organizeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                Host a Voluntary Blood Donation Camp
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                We partner with accredited Blood Banks and Red Cross to arrange mobile buses, medical doctors, refreshments, and donor certificates.
              </p>

              {orgSuccess ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900">Request Registered!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Our regional camp coordinator will contact you within 24 hours with mobile van logistics.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOrganizeCampSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Organization / College / Society</label>
                    <input
                      type="text"
                      required
                      value={orgCollegeName}
                      onChange={(e) => setOrgCollegeName(e.target.value)}
                      placeholder="e.g. IIT Delhi Student Council / DLF Phase 5 RWA"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Coordinator Phone / Email</label>
                    <input
                      type="text"
                      required
                      value={orgContact}
                      onChange={(e) => setOrgContact(e.target.value)}
                      placeholder="+91 98XXX XXXXX or contact@org.in"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expected Donors</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs">
                      <option>50 - 100 Donors</option>
                      <option>100 - 250 Donors</option>
                      <option>250+ Donors (Mega Camp)</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Submit Camp Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrganizeModalOpen(false)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

