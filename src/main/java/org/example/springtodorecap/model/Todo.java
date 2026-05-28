package org.example.springtodorecap.model;

import lombok.Builder;
import lombok.With;
import org.example.springtodorecap.utils.Status;

@With
@Builder
public record Todo(String id, String description, Enum<Status> status) {
}
