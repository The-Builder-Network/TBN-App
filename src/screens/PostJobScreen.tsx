import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import { services } from '../constants/services';
import AppHeader from '../components/shared/AppHeader';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const STEPS = ['Service', 'Details', 'Location', 'Contact'];

export default function PostJobScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [postcode, setPostcode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const canContinue = () => {
    switch (step) {
      case 0: return !!selectedService;
      case 1: return jobDescription.length > 10;
      case 2: return postcode.length >= 5;
      case 3: return !!firstName && !!email && email.includes('@');
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <View style={[styles.container, styles.successContainer, { paddingTop: insets.top }]}>
        <AppHeader title="Post a Job" showBack />
        <View style={styles.successContent}>
          <Text style={styles.successIcon}>🎉</Text>
          <Text style={styles.successTitle}>Job posted!</Text>
          <Text style={styles.successText}>
            We're finding tradespeople interested in your job. You'll be notified as soon as one responds.
          </Text>
          <Button
            size="lg"
            fullWidth
            onPress={() => {
              setSubmitted(false);
              setStep(0);
              setSelectedService('');
              setJobDescription('');
              setPostcode('');
              setFirstName('');
              setLastName('');
              setEmail('');
              setPhone('');
            }}
          >
            Post another job
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Post a Job" />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((step + 1) / STEPS.length) * 100}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          {STEPS.map((label, i) => (
            <Text
              key={label}
              style={[
                styles.progressLabel,
                i === step && styles.progressLabelActive,
                i < step && styles.progressLabelDone,
              ]}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 0: Service Selection */}
        {step === 0 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select a service</Text>
            <Text style={styles.stepSubtitle}>What type of job do you need done?</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search services..."
              placeholderTextColor={Colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {filteredServices.map((svc) => (
              <TouchableOpacity
                key={svc.slug}
                style={[
                  styles.serviceOption,
                  selectedService === svc.slug && styles.serviceOptionSelected,
                ]}
                onPress={() => setSelectedService(svc.slug)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.serviceOptionText,
                    selectedService === svc.slug && styles.serviceOptionTextSelected,
                  ]}
                >
                  {svc.name}
                </Text>
                {selectedService === svc.slug && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 1: Job Description */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Describe your job</Text>
            <Text style={styles.stepSubtitle}>
              The more detail you give, the better matched you'll be with a tradesperson.
            </Text>
            <Card style={styles.selectedServiceBadge} padded={false}>
              <View style={styles.selectedServiceInner}>
                <Text style={styles.selectedServiceLabel}>Service selected</Text>
                <Text style={styles.selectedServiceName}>
                  {services.find((s) => s.slug === selectedService)?.name}
                </Text>
              </View>
            </Card>
            <Text style={styles.inputLabel}>Job description <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.textarea}
              placeholder="e.g. I need a new boiler installed in a 3-bedroom house. The old combi boiler needs removing too."
              placeholderTextColor={Colors.mutedForeground}
              value={jobDescription}
              onChangeText={setJobDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{jobDescription.length} characters</Text>
          </View>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Where is the job?</Text>
            <Text style={styles.stepSubtitle}>
              We'll use your postcode to match you with local tradespeople.
            </Text>
            <Text style={styles.inputLabel}>Postcode <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. SW1A 1AA"
              placeholderTextColor={Colors.mutedForeground}
              value={postcode}
              onChangeText={(t) => setPostcode(t.toUpperCase())}
              autoCapitalize="characters"
            />
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                📍 Your exact address won't be shared until you choose to connect with a tradesperson.
              </Text>
            </View>
          </View>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Your contact details</Text>
            <Text style={styles.stepSubtitle}>
              We'll use these to notify you when tradespeople respond.
            </Text>
            <View style={styles.nameRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>First name <Text style={styles.req}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  placeholder="First name"
                  placeholderTextColor={Colors.mutedForeground}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Last name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Last name"
                  placeholderTextColor={Colors.mutedForeground}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
            <Text style={styles.inputLabel}>Email <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor={Colors.mutedForeground}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.inputLabel}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="07700 000000"
              placeholderTextColor={Colors.mutedForeground}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Text style={styles.legalText}>
              By posting your job you agree to our{' '}
              <Text style={styles.legalLink}>Terms & Conditions</Text> and{' '}
              <Text style={styles.legalLink}>Privacy Policy</Text>.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom actions */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing[3] }]}>
        {step > 0 && (
          <Button
            variant="outline"
            size="lg"
            onPress={() => setStep(step - 1)}
            style={styles.backBtn}
          >
            Back
          </Button>
        )}
        <Button
          size="lg"
          disabled={!canContinue()}
          onPress={handleNext}
          style={[styles.nextBtn, step === 0 ? styles.nextBtnFull : undefined]}
          fullWidth={step === 0}
        >
          {step === STEPS.length - 1 ? 'Post My Job' : 'Continue'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  successContainer: {},
  successContent: {
    flex: 1,
    padding: Spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[4],
  },
  successIcon: { fontSize: 64 },
  successTitle: { fontFamily: Fonts.bold, fontSize: FontSizes['3xl'], color: Colors.foreground },
  successText: { fontFamily: Fonts.regular, fontSize: FontSizes.md, color: Colors.mutedForeground, textAlign: 'center', lineHeight: 24 },
  progressContainer: { paddingHorizontal: Spacing[4], paddingVertical: Spacing[3], borderBottomWidth: 1, borderBottomColor: Colors.border },
  progressTrack: { height: 4, backgroundColor: Colors.muted, borderRadius: 2, marginBottom: Spacing[2] },
  progressFill: { height: 4, backgroundColor: Colors.primary, borderRadius: 2 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground },
  progressLabelActive: { fontFamily: Fonts.semiBold, color: Colors.primary },
  progressLabelDone: { color: Colors.success },
  scrollView: { flex: 1 },
  scrollContent: { padding: Spacing[4], paddingBottom: Spacing[8] },
  stepContainer: { gap: Spacing[4] },
  stepTitle: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.foreground },
  stepSubtitle: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, lineHeight: 22 },
  searchInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[3],
    fontSize: FontSizes.base,
    fontFamily: Fonts.regular,
    color: Colors.foreground,
    backgroundColor: Colors.background,
  },
  serviceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
  },
  serviceOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#EFF6FF',
  },
  serviceOptionText: { fontFamily: Fonts.medium, fontSize: FontSizes.base, color: Colors.foreground },
  serviceOptionTextSelected: { color: Colors.primary },
  checkmark: { color: Colors.primary, fontSize: FontSizes.md, fontFamily: Fonts.bold },
  selectedServiceBadge: { borderRadius: Radius.md },
  selectedServiceInner: { padding: Spacing[3], flexDirection: 'row', alignItems: 'center', gap: Spacing[3] },
  selectedServiceLabel: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground },
  selectedServiceName: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.primary },
  inputLabel: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground },
  req: { color: Colors.destructive },
  textarea: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing[3],
    fontSize: FontSizes.base,
    fontFamily: Fonts.regular,
    color: Colors.foreground,
    backgroundColor: Colors.background,
    minHeight: 140,
    textAlignVertical: 'top',
  },
  charCount: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground, alignSelf: 'flex-end' },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[3],
    fontSize: FontSizes.base,
    fontFamily: Fonts.regular,
    color: Colors.foreground,
    backgroundColor: Colors.background,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: Radius.md,
    padding: Spacing[3],
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: '#1E40AF', lineHeight: 20 },
  nameRow: { flexDirection: 'row', gap: Spacing[3] },
  legalText: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground, lineHeight: 18 },
  legalLink: { color: Colors.primary, textDecorationLine: 'underline' },
  bottomBar: {
    flexDirection: 'row',
    gap: Spacing[3],
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[3],
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  backBtn: { flex: 0, paddingHorizontal: Spacing[5] },
  nextBtn: { flex: 1 },
  nextBtnFull: { flex: 1 },
});
