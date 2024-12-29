import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button, Card, TextField, Autocomplete, Box } from '@mui/material';

interface BasicState {
  selectedJob: string;
}

interface SummaryData {
  summary: string;
  objective: string;
}

interface ProfessionalSummaryProps {
  onSummaryGenerated: (data: SummaryData) => void;
}

const jobTitles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Executive',
  'Business Analyst',
  'Project Manager',
] as const;

const ProfessionalSummary = ({ onSummaryGenerated }: ProfessionalSummaryProps) => {
  const [basics, setBasics] = useState<BasicState>({
    selectedJob: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJobChange = (newValue: string | null) => {
    setBasics((prev) => ({
      ...prev,
      selectedJob: newValue || '',
    }));
    if (error) setError(null);
  };

  const generateSummary = async () => {
    if (!basics.selectedJob) {
      setError('Please select or enter a job title');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://review-backend-ruddy.vercel.app/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobTitle: basics.selectedJob }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      onSummaryGenerated({
        summary: data.summary,
        objective: data.objective,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 3, maxWidth: '2xl', mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Autocomplete
          freeSolo
          options={jobTitles}
          value={basics.selectedJob}
          onChange={(_, newValue) => handleJobChange(newValue)}
          onInputChange={(_, newValue) => handleJobChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Job Title"
              variant="outlined"
              error={!!error}
              helperText={error || 'Select from list or type your own'}
              fullWidth
            />
          )}
        />

        <Button
          variant="contained"
          onClick={generateSummary}
          disabled={loading || !basics.selectedJob}
          sx={{
            width: '100%',
            bgcolor: '#0d9488',
            '&:hover': {
              bgcolor: '#0f766e',
            },
            color: 'white',
            py: 1.5,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Loader2 className="animate-spin" size={20} />
              Generating...
            </Box>
          ) : (
            'Generate Summary'
          )}
        </Button>
      </Box>
    </Card>
  );
};

export default ProfessionalSummary;
