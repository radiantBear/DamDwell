'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  InputAdornment,
  styled,
} from '@mui/material';
import Feature from '@/lib/model/feature';
import { CloudUploadIcon } from 'lucide-react';

interface RentalFormData {
    cost: string;
    address: string;
    availabilityStart: Date | null;
    availabilityEnd: Date | null;
    description: string;
    features: string[];
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function NewListing({ features }: { features: string }) {
    const availableFeatures: Feature[] = JSON.parse(features);
    
    const [form, setForm] = useState<RentalFormData>({
        cost: '',
        address: '',
        availabilityStart: null,
        availabilityEnd: null,
        description: '',
        features: [],
    });

    const handleChange = (field: keyof RentalFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: event.target.value });
    };

    const handleFeatureToggle = (feature: Feature) => () => {
        setForm((prevForm) => {
            const newFeatures = prevForm.features.includes(feature.feature)
                ? prevForm.features.filter((t) => t !== feature.feature)
                : [...prevForm.features, feature.feature];
            return { ...prevForm, features: newFeatures };
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        fetch('/api/listing', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin: '0 auto' }}
        >
            <Typography variant="h5">Rental Information</Typography>

            <TextField
                label="Cost per Month"
                type="number"
                value={form.cost}
                onChange={handleChange('cost')}
                slotProps={{
                    input: { startAdornment: <InputAdornment position="start">$</InputAdornment> }
                }}
                required
            />

            <TextField
                label="Address"
                value={form.address}
                onChange={handleChange('address')}
                required
            />

            <TextField
                label="Availability Start"
                type="date"
                value={form.availabilityStart}
                onChange={handleChange('availabilityStart')}
                slotProps={{ inputLabel: { shrink: true } }}
                required
            />

            <TextField
                label="Availability End"
                type="date"
                value={form.availabilityEnd}
                onChange={handleChange('availabilityEnd')}
                slotProps={{ inputLabel: { shrink: true } }}
                required
            />

            <TextField
                label="Description"
                multiline
                value={form.description}
                onChange={handleChange('description')}
            />

            <Typography variant="subtitle1">Features</Typography>
            <FormGroup>
                {availableFeatures.map((feature) => (
                    <FormControlLabel
                        key={feature.feature}
                        control={
                            <Checkbox
                                checked={form.features.includes(feature.feature)}
                                onChange={handleFeatureToggle(feature)}
                            />
                        }
                        label={feature.feature}
                    />
                ))}
            </FormGroup>

            <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => setForm({ ...form, files: [...(form.files ?? []), ...(event.target.files ?? [])] })}
                    multiple
                />
            </Button>

            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </Box>
    );
}
