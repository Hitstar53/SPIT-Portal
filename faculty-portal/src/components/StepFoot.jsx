import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function StepFoot({ activeStep, handleBack, handleNext, steps }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, backgroundColor: '#fff', borderRadius: '8px', padding: '7.5px 15px', marginTop: '10px' }}>
            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, borderRadius: "8px", border: '1px solid', borderColor: activeStep === 0 ? 'rgba(0,0,0,0.23)' : '#000000', padding: '5px 32px' }}
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext} sx={{ background: activeStep === steps.length - 1 ? '#10A44B' : '#2F7EC7', borderRadius: '8px', padding: '5px 32px', color: '#fff', fontWeight: '500', '&:hover': { background: activeStep === steps.length - 1 ? '#38ba6c' : '#4295e2' } }}>
                {activeStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
        </Box>
    )
}
