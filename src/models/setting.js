const mongoose = require("mongoose");
const SettingSchema = mongoose.Schema({
  membershipApiPath: {
    type: String,
    required: true,
  },
  membershipLids: {
    type: [Number],
    rquired: true,
  },
  semrushDomainOverviewLimit: {
    type: Number,
    default: 20,
  },
  semrushKeywordOverviewLimit: {
    type: Number,
    default: 20,
  },
  semrushCookie: {
    type: String,
    default: "",
  },
  spyfuDomainOverviewLimit: {
    type: Number,
    default: 20,
  },
  spyfuKeywordOverviewLimit: {
    type: Number,
    default: 20,
  },
  spyfuCookie: {
    type: String,
    default: "",
  },
  seolyzeDomainOverviewLimit: {
    type: Number,
    default: 20,
  },
  seolyzeKeywordOverviewLimit: {
    type: Number,
    default: 20,
  },
  seolyzeCookie: {
    type: String,
    default: "",
  },
  sistrixDomainOverviewLimit: {
    type: Number,
    default: 20,
  },
  sistrixKeywordOverviewLimit: {
    type: Number,
    default: 20,
  },
  pipiadsAdvertisementOverviewLimit: {
    type: Number,
    default: 20,
  },
  pipiadsProductOverviewLimit: {
    type: Number,
    default: 20,
  },
  pipiadsAdvertiserOverviewLimit: {
    type: Number,
    default: 20,
  },
  keywordkegKeywordOverviewLimit: {
    type: Number,
    default: 20,
  },
  sistrixCookie: {
    type: String,
    default: "",
  },
  linkcentaurCookie: {
    type: String,
    default: "",
  },
  spamzillaCookie: {
    type: String,
    default: "",
  },
  seodityCookie: {
    type: String,
    default: "",
  },
  rytrmeCookie: {
    type: String,
    default: "",
  },
  wordaiCookie: {
    type: String,
    default: "",
  },
  keywordrevealerCookie: {
    type: String,
    default: "",
  },
  nichescraperCookie: {
    type: String,
    default: "",
  },
  pipiadsCookie: {
    type: String,
    default: "",
  },
  keywordkegCookie: {
    type: String,
    default: "",
  },
  paraphraserCookie: {
    type: String,
    default: "",
  },
  buzzsumoCookie: {
    type: String,
    default: "",
  },
  articleforgeCookie: {
    type: String,
    default: "",
  },
  bigspyCookie: {
    type: String,
    default: "",
  },
  colinkriCookie: {
    type: String,
    default: "",
  },
  colinkriCampaignLimit: {
    type: Number,
    default: 20,
  },
  dinorankCookie: {
    type: String,
    default: "",
  },
  dinorankProminenceLimit: {
    type: Number,
    default: 20,
  },
  yourtextCookie: {
    type: String,
    default: "",
  },
  babbarCookie: {
    type: String,
    default: "",
  },
  firstfrCookie: {
    type: String,
    default: "",
  },
  textoptimizerCookie: {
    type: String,
    default: "",
  },
  onehourindexingCookie: {
    type: String,
    default: "",
  },
  ranxplorerCookie: {
    type: String,
    default: "",
  },
  ranxplorerSiteLimit: {
    type: Number,
    default: 20,
  },
  ranxplorerKeywordLimit: {
    type: Number,
    default: 20,
  },
  ranxplorerExportLimit: {
    type: Number,
    default: 20,
  },
  majesticCookie: {
    type: String,
    default: "",
  },
  majesticBacklinkLimit: {
    type: Number,
    default: 20,
  },
  majesticSearchLimit: {
    type: Number,
    default: 20,
  },
  woorankCookie: {
    type: String,
    default: "",
  },
  woorankReviewLimit: {
    type: Number,
    default: 20,
  },
  seobserverCookie: {
    type: String,
    default: "",
  },
  seobserverKeywordLimit: {
    type: Number,
    default: 20,
  },
  seobserverDomainLimit: {
    type: Number,
    default: 20,
  },
  seobserverUnlockLimit: {
    type: Number,
    default: 20,
  },
  seozoomCookie: {
    type: String,
    default: "",
  },
  affilistingCookie: {
    type: String,
    default: "",
  },
  explodingtopicsCookie: {
    type: String,
    default: "",
  },
  copyscapeCookie: {
    type: String,
    default: "",
  },
  copyscapePageSearchLimit: {
    type: Number,
    default: 20,
  },
  copyscapePremiumSearchLimit: {
    type: Number,
    default: 20,
  },
  copyscapeBatchSearchLimit: {
    type: Number,
    default: 20,
  },
  sellthetrendCookie: {
    type: String,
    default: "",
  },
  ecomhuntCookie: {
    type: String,
    default: "",
  },
  mangoolsCookie: {
    type: String,
    default: "",
  },
  keywordcupidCookie: {
    type: String,
    default: "",
  },
  serpstatCookie: {
    type: String,
    default: "",
  },
  plagiumCookie: {
    type: String,
    default: "",
  },
  plagiumTextLimit: {
    type: Number,
    default: 20,
  },
  plagiumUrlLimit: {
    type: Number,
    default: 5,
  },
  plagiumFileLimit: {
    type: Number,
    default: 5,
  },
  yourtextProjectLimit: {
    type: Number,
    default: 5,
  },
  yourtextGroupLimit: {
    type: Number,
    default: 5,
  },
  closerscopyCookie: {
    type: String,
    default: "",
  },
  linkodyCookie: {
    type: String,
    default: "",
  },
  alisharkCookie: {
    type: String,
    default: "",
  },
  pexdaCookie: {
    type: String,
    default: "",
  },
  zonbaseCookie: {
    type: String,
    default: "",
  },
  analyzonbaseCookie: {
    type: String,
    default: "",
  },
  dropshipCookie: {
    type: String,
    default: "",
  },
  espinnerCookie: {
    type: String,
    default: "",
  },
  asinseedCookie: {
    type: String,
    default: "",
  },
  sellerspriteCookie: {
    type: String,
    default: "",
  },
  kindlerankerCookie: {
    type: String,
    default: "",
  },
  iconscoutCookie: {
    type: String,
    default: "",
  },
  spinrewriterCookie: {
    type: String,
    default: "",
  },
  pacdoraCookie: {
    type: String,
    default: "",
  },
  templatemonsterCookie: {
    type: String,
    default: "",
  },
  toolindexmenowCookie: {
    type: String,
    default: "",
  },
  toolindexmenowProjectLimit: {
    type: Number,
    default: 5,
  },
  toolindexmenowLinkLimit: {
    type: Number,
    default: 5,
  },
  publicwwwCookie: {
    type: String,
    default: "",
  },
  publicwwwSearchLimit: {
    type: Number,
    default: 5,
  },
  searchatlasCookie: {
    type: String,
    default: "",
  },
  wincherCookie: {
    type: String,
    default: "",
  },
});

const Setting = mongoose.model("setting", SettingSchema);

module.exports = Setting;
