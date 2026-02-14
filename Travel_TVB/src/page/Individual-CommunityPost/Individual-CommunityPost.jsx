// src/pages/IndividualCommunityPost/IndividualCommunityPost.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import SingleCommunityPost from '../../components/SingleCommunityPost/SingleCommunityPost'; // <-- MODIFIED: Import the new component
import CtaBanner from '../../components/Layout/CtaBanner/CtaBanner';

const IndividualCommunityPost = () => {
    // This logic remains the same
    const { slug } = useParams();

    return (
        // MODIFIED: Updated the wrapper class name for consistency
        <div className="individual-community-post-page">
            {/* MODIFIED: Use the new component and pass the slug to it */}
            <SingleCommunityPost slug={slug} />
            <CtaBanner />
        </div>
    );
};

export default IndividualCommunityPost;